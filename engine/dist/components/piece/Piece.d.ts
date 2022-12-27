import { PieceListing } from 'formation/structure/pieceCollection';
import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';
import Movable from 'session/move/interfaces/movable';
declare abstract class Piece {
    readonly side: Side;
    readonly kind: PieceKind;
    position: Position;
    legalLines: ShortPosition[][];
    availableMoves: ShortPosition[];
    abstract updateLegalLines(): void;
    static create({ kind, side }: PieceListing): Piece;
    constructor(piece: PieceKind, side: Side);
    getLegalLines(...searchAlgorithms: ((_position: Position) => ShortPosition[][])[]): ShortPosition[][];
    isMovable(): this is Movable;
    logMove(to: ShortPosition, didCapture?: boolean): string;
}
export default Piece;
