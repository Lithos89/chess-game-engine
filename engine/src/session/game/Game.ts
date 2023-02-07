
import { isEmpty, isEqual, isString, isUndefined } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition, type Side, type BoardDirection, SIDES } from '../../logic/terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { Attack } from '../../logic/concepts';
import defaultStartingFormation from '../../formation/setups/start';

// Components
import Square from '../../components/Square';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';

// Game Management
import BoardManager from '../board/BoardManager';
import MoveManager from '../move/MoveManager';
import EventManager from './EventManager';

// State Management
import Observer from '../../state/Observer';
import Observable from '../../state/observable';
import getEnemySide from '../../utils/regulation/side/getEnemySide';

class Game implements Observable {
  readonly id: string;
  private readonly startingFormation: PieceListings = defaultStartingFormation;

  // readonly playerSide: Side | null = null;
  protected currentTurnSide: Side = 'white';
  private turnCount: number = 0;
  protected isOver: boolean = false;
  private result: Side | 'draw';

  private boardManager: BoardManager;
  private moveManager: MoveManager;

  private observer: Observer<Game>;

  private moveController;

  protected signalFinish: (result: Side | 'draw') => (() => void);
  protected startNextGameCallback = () => {};

  constructor(id: string, protected readonly playerSide: Side | null = null) {
    this.id = id;

    this.observer = new Observer(this);

    this.boardManager = new BoardManager(
      this.startingFormation,
      () => this.currentTurnSide,
      () => this.signalState('board')
    );

    // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
    this.moveManager = new MoveManager(
      (type?: string) => this.signalState(type),
      (king: King, direction: BoardDirection) => this.boardManager.commitCastle(king, direction)
    );
    this.updateMoves();

    if (this.playerSide && this.currentTurnSide !== this.playerSide) {
      this.takeComputerTurn();
    }
  };

  public signalState = (type?: string, data?: {}) => {
    switch (type) {
      case 'board': {
        const boardState = this.boardManager.compileBoard();
        this.observer.commitState(prevState => ({
          ...prevState,
          finished: this.isOver,
          board: boardState,
          currentTurnSide: this.currentTurnSide
        }));
        break;
      }
      case 'capture': {
        const captures = this.moveManager.captures;
        this.observer.commitState(prevState => ({ ...prevState, captures }));
        break;
      }
      case 'move-log': {
        const moveHistory = this.moveManager.getMoveHistory();
        this.observer.commitState(prevState => ({ ...prevState, moveLog: moveHistory }));
        break;
      }
      case 'move-controller': {
        const moveController = data;
        this.moveController = moveController
        this.observer.commitState(prevState => ({
          ...prevState,
          moveController,
          currentTurnSide: this.currentTurnSide
        }));
        break;
      }
      default: {
        const boardState = this.boardManager.compileBoard();
        const moveHistory = this.moveManager.getMoveHistory();
        const moveController = this.moveController ?? {}
        this.observer.commitState({
          board: boardState,
          moveLog: moveHistory,
          currentTurnSide: this.currentTurnSide,
          finished: this.isOver,
          moveController,
          captures: this.moveManager.captures
        });
        break;
      }
    };
  };


  //--------------------------------HIGHLIGHTING AND MOVEMENT----------------//

  private takeTurn() {
    this.turnCount += 1;
    this.updateMoves(this.currentTurnSide);

    if (!this.isOver) {
      this.currentTurnSide = getEnemySide(this.currentTurnSide);

      if (this.playerSide && this.currentTurnSide !== this.playerSide && !this.isOver) {
        this.takeComputerTurn();
      };
    } else {
      this.startNextGameCallback = this.signalFinish(this.result);
    }
  };

  private takeComputerTurn() {
    const [from, to] = this.genRandomMove(this.currentTurnSide);

    setTimeout(() => {
      this.moveManager.commitMove(
        this.boardManager.boardSquares[from],
        this.boardManager.boardSquares[to]
      );
      this.takeTurn();
    }, 1000);
  };

  //* Returns whether the highlight was performed successfully
  protected attemptHighlight = (position?: ShortPosition): boolean => {
    if (isString(position)) {
      const selectedPiece = this.boardManager.boardSquares[position]?.piece;

      if ((selectedPiece instanceof Piece) && isEqual(selectedPiece.side, this.currentTurnSide) && (!this.playerSide || isEqual(this.currentTurnSide, this.playerSide))){
        this.boardManager.highlightMoves(selectedPiece);
        return true;
      } else {
        return false;
      };
    } else {
      this.boardManager.highlightMoves();
      return true;
    };
  };

  protected attemptMove = (from: ShortPosition, to: ShortPosition): boolean => {
    const originSquare: Square = this.boardManager.boardSquares[from];
    const destSquare: Square = this.boardManager.boardSquares[to];

    //* Move Validity checks
    const isLegal = originSquare.piece?.availableMoves.includes(to);
    const isValidSide = isEqual(originSquare?.piece.side, this.currentTurnSide);

    if (isLegal && isValidSide) {
      this.moveManager.commitMove(originSquare, destSquare);
      this.takeTurn();
      return true;
    } else {
      return false;
    };
  };

  protected genRandomMove = (side: Side) => {
    const possibleMoves = [];
    Object.keys(this.boardManager.boardSquares).forEach((pos) => {
      const piece = this.boardManager.boardSquares[pos as ShortPosition].piece;
      if (piece?.side === side) {
        piece.availableMoves.forEach((val) => {
          possibleMoves.push([pos, val]);
        });
      };
    });
    
    const _selection = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[_selection];
  };

  // TODO: Add more checks and functionality here
  protected undo = () => {
    this.moveManager.takebackMove();
  };

  public updateMoves = (sideLastMoved?: Side) => {
    const checks: Attack[] = [];
    this.boardManager.processAvailableMoves(checks, sideLastMoved);



    if (!isUndefined(sideLastMoved)) {
      if (isEmpty(checks)) {
        const sideToMove = getEnemySide(sideLastMoved);
        const isDraw = EventManager.identifyDraw(
          this.boardManager.boardSquares,
          sideToMove
        );

        if (isDraw) {
          this.isOver = true;
          this.result = 'draw';
        }
      } else { 
        const isCheckmate = (Array.from(checks))
          .map((attack) => EventManager.forceCheckResolve(
              this.boardManager.boardSquares,
              attack,
              sideLastMoved
            )
          )
          .some(Boolean);

        if (isCheckmate) {
          console.info("Checkmate");
          this.isOver = true;

          if (this.playerSide) {
            if (this.playerSide === this.currentTurnSide) {
              this.result = this.currentTurnSide;
              console.info(this.playerSide + 'has won')
            } else {
              this.result = getEnemySide(this.currentTurnSide);
              console.info('The computer has won');
            }
          }
        } else {
          console.info("Check");
        };
      };
    };
    this.signalState('board');
  };
};

export default Game;
