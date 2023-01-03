import { PieceListing } from './pieceCollection';
import { PresentedSquare } from './squareCollection';
import { ShortPosition } from 'logic/terms';
export interface BoardSquareCondensed {
    position: ShortPosition;
    square: PresentedSquare;
    piece: PieceListing | null;
}
