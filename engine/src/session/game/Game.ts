import { ShortPosition, SIDES } from '../../logic/Terms';
import { PieceKind, type Side } from '../../logic/Terms';
import defaultStartingFormation from '../../formation/setups/start';
import BoardManager from '../board/BoardManager';
import MoveManager from '../move/MoveManager';
import Square from 'components/Square';

class Game {
  readonly id: string;

  readonly playerSide: Side;
  private currentTurnSide: Side = 'white';
  private turnCount: number = 0;
  private startingFormation = defaultStartingFormation;

  private boardManager: BoardManager;
  private moveManager: MoveManager;
  // boardObserver: BoardObserver;

  captures: {[_side in Side]: {[_piece in PieceKind] : number}} = {
    white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
    black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
  };

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;

    const boardManager = new BoardManager(this.startingFormation, () => this.currentTurnSide);
    this.boardManager = boardManager;
    // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
    this.moveManager = new MoveManager(boardManager); // ?: See if I can get rid of the boardManager parameter
  };

  private takeTurn = () => {
    this.currentTurnSide = SIDES[1 - SIDES.indexOf(this.currentTurnSide)];
    this.turnCount += 1
  };

  protected highlightPiece = (position?: ShortPosition): boolean => {
    if (position) {
      const selectedPiece = this.boardManager.boardSquares[position]?.piece;

      if (selectedPiece?.side === this.currentTurnSide) {
        this.boardManager.highlightAvailableSquares(selectedPiece);
        return true;
      } else {
        return false;
      }
    } else {
      this.boardManager.highlightAvailableSquares();
      return false;
    }
  }

  protected move = (from: ShortPosition, to: ShortPosition): boolean => {
    const originSquare: Square = this.boardManager.boardSquares[from];
    const destSquare: Square = this.boardManager.boardSquares[to];

    const isMoveValid = originSquare?.piece?.availableMoves.includes(to) &&
      originSquare?.piece.side === this.currentTurnSide;

    if (isMoveValid) {
      this.moveManager.commitMove(originSquare, destSquare);
      this.takeTurn();
      return true;
    } else {
      return false;
    }
  };

  protected undo = () => {
    this.moveManager.takebackMove();
  }
};

export default Game;
