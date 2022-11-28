import { Position, Side } from './Terms';

import Piece from './pieces/Piece';


class Square {
  // only allow position to be set
  public readonly pos: Position;
  public readonly side: Side;
  public piece: Piece;
  public abbrPiece: string;

  constructor(position: Position, side: Side) {
    this.pos = position;
    this.side = side;
  }

  getPosition(): string {
    return this.pos.col + this.pos.row;
  }

  /*
    Possible cases to consider:
    1. Passing in an initialized piece
    2. Passing in the type of a piece and initializing it in the method of square
    3. Passing in the string of the piece and then through a switch statement initializing the appropriate piece, thereby removing all the imports scattered across the app

  */
  setPiece(newPiece: Piece) {
    this.piece = newPiece;
    this.abbrPiece = String(typeof newPiece)
  }
}

export default Square;