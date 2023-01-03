import { PieceListing } from 'formation/structure/pieceCollection';
import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
import DynamicBehavior from './interfaces/dynamicBehavior';
type MoveLine = ShortPosition[];
type MoveAlgorithm = (_position: Position) => MoveLine[];
declare abstract class Piece {
    readonly side: Side;
    readonly kind: PieceKind;
    position: Position;
    legalLines: MoveLine[];
    availableMoves: ShortPosition[];
    abstract movementAlgorithms: MoveAlgorithm[];
    static create({ kind, side }: PieceListing): Piece;
    constructor(piece: PieceKind, side: Side);
    isMultiBehavioral(): this is DynamicBehavior;
    updateLegalLines(): void;
    logMove(to: ShortPosition, didCapture?: boolean): string;
}
export default Piece;
