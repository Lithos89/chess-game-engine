import { PieceKind } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/concepts';
import DynamicBehavior from './interfaces/dynamicBehavior';
import AlternativeCapturing from './interfaces/alternativeCapturing';
import Piece from './Piece';
import Square from '../Square';
declare class Pawn extends Piece implements DynamicBehavior, AlternativeCapturing {
    kind: PieceKind;
    private readonly direction;
    movementAlgorithms: null;
    moved: boolean;
    captureLines: MoveLine[];
    captureAlgorithms: (({ row, col }: import("../../logic/terms").Position) => MoveLine[])[];
    loadMoveAlgorithms(): MoveAlgorithm[];
    influenceEmptySquare: () => boolean;
    influenceOccupiedSquare: () => boolean;
    altInfluenceEmptySquare: (square: Square) => boolean;
    altInfluenceOccupiedSquare: (square: Square, playableLine: MoveLine) => boolean;
}
export default Pawn;
