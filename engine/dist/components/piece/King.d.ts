import { type Side } from '../../logic/terms';
import { type MoveLine } from '../../logic/algorithms/types';
import Piece from './Piece';
import Square from '../Square';
import DynamicBehavior from './interfaces/dynamicBehavior';
interface Attack {
    attackPiece: Piece;
    frontAttackLine: MoveLine;
}
declare class King extends Piece implements DynamicBehavior {
    movementAlgorithms: null;
    moved: boolean;
    enemyKing: King;
    checks: Attack[];
    constructor(side: Side);
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => MoveLine[])[];
    influenceEmptySquare(square: Square): boolean;
    influenceOccupiedSquare(square: Square): boolean;
}
export default King;
