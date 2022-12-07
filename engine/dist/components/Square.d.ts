import { Position, ShortPosition } from '../logic/Terms';
import Piece from '../components/pieces/index';
export type SquareColor = 'light' | 'dark';
export default class Square {
    readonly position: Position;
    readonly color: SquareColor;
    piece: Piece;
    abbrPiece: string;
    constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | null);
    getPosition(): ShortPosition;
    setPiece(newPiece: Piece): void;
}
