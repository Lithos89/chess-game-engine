import { PieceKind } from './../logic/terms';

// Types, interfaces, constants, ...
import { type Position, type ShortPosition, type Side, type SquareColor } from '../logic/terms';

// Components
import Piece from './piece/Piece';

// Utils
import convertPosition from '../utils/regulation/position/convertPosition';

class Square {
  // only allow position to be set
  public readonly position: Position;
  public readonly color: SquareColor;
  public controlled: {[side in Side]: boolean} = {
    white: false,
    black: false,
  };

  public piece: Piece;

  constructor(position: Position | ShortPosition, color: SquareColor, piece: Piece | null = null) {
    if (typeof position === 'string')
      this.position = convertPosition(position) as Position;
    else if (typeof position === 'object')
      this.position = position;
    else
      throw Error("Improper position format provided to square")

    this.color = color;
    this.setPiece(piece);
  };

  // TODO: This function still needs refinement to conform needs type support
  public setPiece(piece: Piece) {
    this.piece = piece;
    if (this.piece !== null) {
      this.piece.position = this.position;
      this.piece.updateLines();
    };
  };

  removePiece() {
    this.piece = null;
  };

  // transferPiece(destSquare: Square) {
  //   const piece = this.piece;

  //   destSquare.
  //   this.piece = null;
  // };
};

export default Square;
