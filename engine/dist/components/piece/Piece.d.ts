import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/concepts';
import DynamicBehavior from './interfaces/dynamicBehavior';
import AlternativeCapturing from './interfaces/alternativeCapturing';
import Square from '../Square';
export default abstract class Piece {
    readonly kind: PieceKind;
    readonly side: Side;
    position: Position;
    isProtected: boolean;
    legalLines: MoveLine[];
    availableMoves: ShortPosition[];
    abstract movementAlgorithms: MoveAlgorithm[];
    constructor(kind: PieceKind, side: Side);
    isMultiBehavioral(): this is DynamicBehavior;
    hasAlternativeCapturing(): this is AlternativeCapturing;
    updateLines(): void;
    influenceEmptySquare: (square: Square) => boolean;
    influenceOccupiedSquare: (square: Square, playableLine: MoveLine) => boolean;
    logMove(to: ShortPosition, didCapture?: boolean): string;
}
