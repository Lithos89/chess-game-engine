import { PieceListings } from '../formation/structure/pieceCollection';
import { type ShortPosition, type Position } from '../logic/Terms';
export declare function convertPosition(rawPosition: ShortPosition | Position): ShortPosition | Position;
export declare function flipFormation(piecesFormation: PieceListings): PieceListings;
