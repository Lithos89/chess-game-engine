import { type Position, type ShortPosition, type Side, type SquareColor } from '../logic/terms';
import Piece from './piece/Piece';
declare class Square {
    readonly position: Position;
    readonly color: SquareColor;
    piece: Piece;
    abbrPiece: string;
    controlled: {
        [side in Side]: boolean;
    };
    constructor(position: Position | ShortPosition, color: SquareColor, piece?: Piece);
    setPiece(newPiece: Piece): void;
}
export default Square;
