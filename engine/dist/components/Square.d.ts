import { type Position, type ShortPosition, type Side, type SquareColor } from '../logic/terms';
import Piece from './piece/Piece';
declare class Square {
    readonly position: Position;
    readonly color: SquareColor;
    controlled: {
        [side in Side]: boolean;
    };
    piece: Piece;
    constructor(position: Position | ShortPosition, color: SquareColor, piece?: Piece | null);
    setPiece(piece: Piece): void;
    removePiece(): void;
}
export default Square;
