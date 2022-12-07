import { Position, ShortPosition } from '../logic/Terms';
import Piece from '../components/pieces/index';

// Utils
import { convertPosition } from '../utils';

export type SquareColor = 'light' | 'dark';

export default class Square {
  // only allow position to be set
  public readonly position: Position;
  public readonly color: SquareColor;
  public piece: Piece;
  public abbrPiece: string;

  constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | null)
  constructor(position: Position | ShortPosition, color: SquareColor, piece?: Piece) {
    if (typeof position === 'string') {
      this.position = convertPosition(position) as Position
    } else if (typeof position === 'object') {
      this.position = position;
    }
    this.color = color;
    this.setPiece(piece);
  }

  getPosition(): ShortPosition {
    return convertPosition(this.position) as ShortPosition;
  };

  /*
    Possible cases to consider:
    1. Passing in an initialized piece
    2. Passing in the type of a piece and initializing it in the method of square
    3. Passing in the string of the piece and then through a switch statement initializing the appropriate piece, thereby removing all the imports scattered across the app

  */
  setPiece(newPiece: Piece) {
    this.piece = newPiece;
    if (this.piece !== null) {
      this.piece.position = this.position
      this.piece.updateAvailableMoves();
    }
    this.abbrPiece = String(typeof newPiece);
  }
};