
import { isEmpty, isEqual, isString, isUndefined } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition, type Side, SIDES } from '../../logic/terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { MoveLine } from '../../logic/algorithms/types';
import defaultStartingFormation from '../../formation/setups/start';

// Components
import Square from '../../components/Square';
import Piece from '../../components/piece/Piece';

// Game Management
import BoardManager from '../board/BoardManager';
import MoveManager from '../move/MoveManager';
import EventManager from './EventManager';

// State Management
import Observer from '../../state/Observer';
import Observable from 'state/observable';

interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine
};

class Game implements Observable {
  readonly id: string;
  private readonly startingFormation: PieceListings = defaultStartingFormation;

  readonly playerSide: Side;
  private currentTurnSide: Side = 'white';
  private turnCount: number = 0;

  private boardManager: BoardManager;
  private moveManager: MoveManager;

  private observer: Observer<Game>;

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;

    this.observer = new Observer(this);

    const altBoard = side === "white";
    this.boardManager = new BoardManager(
      this.startingFormation,
      altBoard,
      () => this.currentTurnSide,
      () => this.signalState('board')
    );

    // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
    this.moveManager = new MoveManager((type?: string) => this.signalState(type));
    // this.moveManager.updateMoves(this.boardManager.boardSquares);
    this.updateMoves();
  };

  public signalState = (type?: string) => {
    switch (type) {
      case 'board': {
        const boardState = this.boardManager.compileBoard();
        this.observer.commitState(prevState => ({ ...prevState, board: boardState }));
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
      default: {
        const boardState = this.boardManager.compileBoard();
        const moveHistory = this.moveManager.getMoveHistory();
        this.observer.commitState({ board: boardState, moveLog: moveHistory });
        break;
      }
    };
  };


  //--------------------------------HIGHLIGHTING AND MOVEMENT----------------//

  private takeTurn() {
    this.updateMoves(this.currentTurnSide);
    this.currentTurnSide = SIDES[1 - SIDES.indexOf(this.currentTurnSide)];
    this.turnCount += 1;
  };

  //* Returns whether the highlight was performed successfully
  protected attemptHighlight = (position?: ShortPosition): boolean => {
    if (isString(position)) {
      const selectedPiece = this.boardManager.boardSquares[position]?.piece;

      if ((selectedPiece instanceof Piece) && isEqual(selectedPiece.side, this.currentTurnSide)) {
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
    const isLegal = originSquare?.piece?.availableMoves.includes(to);
    const isValidSide = isEqual(originSquare?.piece.side, this.currentTurnSide);

    if (isLegal && isValidSide) {
      this.moveManager.commitMove(originSquare, destSquare);
      this.takeTurn();
      return true;
    } else {
      return false;
    };
  };

  // TODO: Add more checks and functionality here
  protected undo = () => {
    this.moveManager.takebackMove();
  };









  public updateMoves = (sideLastMoved?: Side) => {
    const checks: Attack[] = [];
    this.boardManager.processAvailableMoves(checks, sideLastMoved);
    console.info("checks")
    console.info(checks)

    if (!isEmpty(checks) && !isUndefined(sideLastMoved)) {
      const isCheckmate = (Array.from(checks))
        .map((attack) => EventManager.forceCheckResolve(
            this.boardManager.boardSquares,
            attack,
            sideLastMoved
          )
        )
        .some(Boolean);


      console.info(this.boardManager.boardSquares);
      if (isCheckmate) {
        console.info("Checkmate");  
      } else {
        console.info("Check");
      };
    };

    this.signalState('board');
  };
};

export default Game;
