import { type ShortPosition, type Position } from '../logic/terms';
import { type PieceListings } from '../formation/structure/pieceCollection';
export declare function convertPosition(position: ShortPosition | Position): ShortPosition | Position;
export declare function flipFormation(piecesFormation: PieceListings): PieceListings;
export declare function indexInRange(index: number, array: readonly any[] | any[]): boolean;
