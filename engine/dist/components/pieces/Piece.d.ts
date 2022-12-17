import { PieceListing } from 'formation/structure/pieceCollection';
import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';
declare abstract class Piece {
    readonly side: Side;
    readonly kind: PieceKind;
    position: Position;
    availableMoves: ShortPosition[];
    abstract updateAvailableMoves(): void;
    static create({ kind, side }: PieceListing): Piece;
    constructor(piece: PieceKind, side: Side);
    getAvailablePositions(...searchAlgorithms: ((_position: Position) => ShortPosition[])[]): ShortPosition[];
}
export default Piece;
