
// Types, interfaces, constants, ...
import { type ShortPosition } from '../../logic/Terms';
import { BoardSquareListings } from '../../formation/structure/squareCollection';

// Classes
import MoveController from './MoveController';
import MoveHistoryLL from './MoveHistoryLL';

// !: Worth looking into the relationships of MoveManager for bugs
// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
class MoveManager {
  protected boardSquares: BoardSquareListings // ?: See if this has to be here
  readonly controller: MoveController
  moveLL: MoveHistoryLL; // ?: See if this can be made private and read only
  updateBoard; // ?: Fix this

  constructor(squareListing: BoardSquareListings, boardUpdateCallback, highlightBoard) {
    this.updateBoard = boardUpdateCallback;
    this.boardSquares = squareListing;
    this.moveLL = new MoveHistoryLL();

    // !: Need to figure out a better way of passing these callbacks
    this.controller = new MoveController(this.boardSquares, this.commitMove, highlightBoard, this.takebackMove);
  };

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

    // ?: Will also update the board with the new state reflecting the takeback
    // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
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
