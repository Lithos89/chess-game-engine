import { PieceListing } from 'formation/structure/pieceCollection';
import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/algorithms/types';
import DynamicBehavior from './interfaces/dynamicBehavior';
declare abstract class Piece {
    readonly side: Side;
    readonly kind: PieceKind;
    position: Position;
    legalLines: MoveLine[];
    captureLines: MoveLine[];
    availableMoves: ShortPosition[];
    captureAlgorithms: MoveAlgorithm[];
    abstract movementAlgorithms: MoveAlgorithm[];
    static create({ kind, side }: PieceListing): Piece;
    constructor(piece: PieceKind, side: Side);
    isMultiBehavioral(): this is DynamicBehavior;
    updateLines(): void;
    logMove(to: ShortPosition, didCapture?: boolean): string;
}
export default Piece;
