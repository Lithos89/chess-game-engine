import { type Position, type ShortPosition, type Side } from '../logic/terms';
import Piece from './piece/Piece';
export type SquareColor = 'light' | 'dark';
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
