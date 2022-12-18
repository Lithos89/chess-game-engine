import { Position, ShortPosition } from '../logic/Terms';
import Piece from './piece';
export type SquareColor = 'light' | 'dark';
export default class Square {
    readonly position: Position;
    readonly color: SquareColor;
    piece: Piece;
    abbrPiece: string;
    constructor(position: Position | ShortPosition, color: SquareColor, piece?: Piece);
    setPiece(newPiece: Piece): void;
}
