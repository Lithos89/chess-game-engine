import { type ShortPosition } from 'logic/Terms';
import Square from 'components/Square';
import Piece from '../../components/pieces/index';

// *: The purpose of MoveController will be to keep track of available moves, forced plays, signal someone has won, and more...
export default class MoveController {
  private boardSquares: { [shortPosition: string] : Square }

  constructor(squareListing: { [shortPosition: string] : Square }) {
    this.boardSquares = squareListing;
    Piece.movePiece = this.moveRequestCallback;
  }

  // !: Make sure to make these run at the same time because the piece could be added to the original, and not yet be deleted from the original,
  // !: leading to a duplication glitch
  requestMove = (from: ShortPosition, to: ShortPosition) => {
    const originPiece = this.boardSquares[from]?.piece
    // const destPiece = this.boardSquares[to]?.piece

    this.boardSquares[to].piece = originPiece;
    delete this.boardSquares[from].piece

    // TODO: Add filter functions here that will evaluate if it is a viable move
  }

  moveRequestCallback = (origin: Square, dest: Square) => {
    const originPosShort: ShortPosition = `${origin.pos.col}${origin.pos.row}` as ShortPosition;
    const destPosShort: ShortPosition = `${dest.pos.col}${dest.pos.row}`;

    // const destPosShort: ShortPosition = `${dest.pos.col}${dest.pos.row}`;
    // const destPosShort = 'd4';
    // this.requestMove(originPosShort, destPosShort);
    const originPiece = origin.piece
    // const destPiece = this.boardSquares[to]?.piece

    dest.setPiece(originPiece);
    delete origin.piece;
  };


};