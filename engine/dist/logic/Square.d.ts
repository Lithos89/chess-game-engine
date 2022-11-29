import { Position, ShortPosition } from './Terms';
import Piece from './pieces';
export type SquareColor = 'light' | 'dark';
export default class Square {
    readonly pos: Position;
    readonly color: SquareColor;
    piece: Piece;
    abbrPiece: string;
    constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | void);
    getPosition(): string;
    setPiece(newPiece: Piece): void;
}
