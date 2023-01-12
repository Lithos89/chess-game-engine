
// Types, interfaces, constants, ...
import { type Position, type ShortPosition, type Side } from '../logic/terms';

// Components
import Piece from './piece/Piece';

// Utils
import convertPosition from '../utils/position/convertPosition';

export type SquareColor = 'light' | 'dark';

class Square {
  // only allow position to be set
  public readonly position: Position;
  public readonly color: SquareColor;
  public piece: Piece;
  public abbrPiece: string;

  public controlled: {[side in Side]: boolean} = {
    white: false,
    black: false,
  };

  // constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | null)
  constructor(position: Position | ShortPosition, color: SquareColor, piece: Piece = null) {
    if (typeof position === 'string')
      this.position = convertPosition(position) as Position;
    else if (typeof position === 'object')
      this.position = position;

    this.color = color;
    this.setPiece(piece);
  }

  /*
    Possible cases to consider:
    1. Passing in an initialized piece
    2. Passing in the type of a piece and initializing it in the method of square
    3. Passing in the string of the piece and then through a switch statement initializing the appropriate piece, thereby removing all the imports scattered across the app

  */

  // TODO: This function still needs refinement to conform needs type support
  setPiece(newPiece: Piece) {
    this.piece = newPiece;
    if (this.piece !== null) {
      this.piece.position = this.position;
      this.piece.updateLines();
    }
    this.abbrPiece = String(typeof newPiece);
  };
};

export default Square;
