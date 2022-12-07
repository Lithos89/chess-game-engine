import { BoardSquareListings } from '../../formation/structure/squareCollection';
// Types, interfaces, constants, ...
import { type ShortPosition } from '../../logic/Terms';

// Classes
import MoveController from './MoveController';
import MoveHistoryLL from './MoveHistoryLL';

// Components
// import Piece from 'components/pieces';

// *: The purpose of MoveController will be to keep track of available moves, forced plays, signal someone has won, and more...
class MoveManager {
  protected boardSquares: BoardSquareListings
  readonly controller: MoveController
  moveLL: MoveHistoryLL;
  updateBoard;

  constructor(squareListing: BoardSquareListings, boardUpdateCallback, highlightBoard) {
    this.updateBoard = boardUpdateCallback
    this.boardSquares = squareListing;
    this.moveLL = new MoveHistoryLL();
    this.controller = new MoveController(this.boardSquares, this.commitMove, highlightBoard, this.takebackMove);
  }

  // Functions to include in this class

  /*
    - Victory check
    - "Check" check
    - Draw check
      - 3 Repeated Move check
      - Insufficient Material Check
    ?: - Time check (if I decide to take the app this far)
  */

  takebackMove = () => {
    this.moveLL.removeLastMove();
    console.log(this.moveLL.listMoves());

    // !: Will also update the board with the new state reflecting the takeback

    // !: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
  }

  commitMove = (from: ShortPosition, to: ShortPosition): void => {

    const originSquare = this.boardSquares[from];
    const destSquare = this.boardSquares[to];

    const originPiece = originSquare?.piece;
    originSquare.piece = null;

    // destpiece will be used when it comes to reflecting captures
    const destPiece = destSquare?.piece

    destSquare.setPiece(originPiece);

    this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
    console.log(this.moveLL.listMoves());

    // TODO: Add some callback that will then update the client with the new board rather than returning like the primitive iteration
    this.updateBoard();
  }
};

export default MoveManager;
