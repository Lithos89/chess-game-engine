import { Position, ShortPosition, Row, Column } from '../Terms';
import Piece from '../components/pieces/index';

export type SquareColor = 'light' | 'dark';

export default class Square {
  // only allow position to be set
  public readonly pos: Position;
  public readonly color: SquareColor;
  public piece: Piece;
  public abbrPiece: string;

  constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | void)
  constructor(position: Position | ShortPosition, color: SquareColor, piece?: Piece) {
    if (typeof position === 'string') {
      this.pos = {
        row: position[1] as Row,
        col: position[0] as Column,
      }
    } else if (typeof position === 'object') {
      this.pos = position;
    }
    this.color = color;

    this.setPiece(piece);
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
    this.abbrPiece = String(typeof newPiece);
  }
};