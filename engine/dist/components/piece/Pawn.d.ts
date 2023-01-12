import { type Side } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/algorithms/types';
import DynamicBehavior from './interfaces/dynamicBehavior';
import Piece from './index';
import Square from '../Square';
declare class Pawn extends Piece implements DynamicBehavior {
    private readonly direction;
    movementAlgorithms: null;
    moved: boolean;
    constructor(side: Side);
    loadMoveAlgorithms(): MoveAlgorithm[];
    influenceEmptySquare: () => boolean;
    influenceOccupiedSquare: () => boolean;
    altEmptySquareCallback(square: Square): boolean;
    altOccupiedSquareCallback: (square: Square, playableLine: MoveLine) => boolean;
}
export default Pawn;
