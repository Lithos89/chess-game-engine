import { type ShortPosition, type Position } from '../logic/Terms';
import { type PieceListings } from '../formation/structure/pieceCollection';
export declare function convertPosition(position: ShortPosition | Position): ShortPosition | Position;
export declare function flipFormation(piecesFormation: PieceListings): PieceListings;
