import { type ShortPosition, type Position, type Side } from '../logic/terms';
import { type PieceListings } from '../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../formation/structure/squareCollection';
import Piece, { King } from '../components/piece';
export declare function convertPosition(position: ShortPosition | Position): ShortPosition | Position;
export declare function flipFormation(piecesFormation: PieceListings): PieceListings;
export declare function sortPieces(board: BoardSquareListings): [basicPieces: {
    [side in Side]: Piece[];
}, kings: {
    [side in Side]: King;
}];
export declare function indexInRange(index: number, array: readonly any[] | any[]): boolean;
