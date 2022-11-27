import { Position, Side } from './Terms';
import Piece from './pieces/Piece';
declare class Square {
    readonly pos: Position;
    readonly side: Side;
    piece: Piece;
    constructor(position: Position, side: Side);
    getPosition(): string;
    setPiece(newPiece: Piece): void;
}
export default Square;
