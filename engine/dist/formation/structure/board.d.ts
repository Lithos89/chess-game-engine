import { PieceListing } from './pieceCollection';
import { PresentedSquare } from './squareCollection';
import { ShortPosition } from 'logic/Terms';
export interface BoardSquareCondensed {
    position: ShortPosition;
    square: PresentedSquare;
    piece: PieceListing | null;
}
