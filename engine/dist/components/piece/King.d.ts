import { type Side, type BoardDirection } from '../../logic/terms';
import { Attack } from '../../logic/concepts';
import Piece from './Piece';
import Square from '../Square';
import DynamicBehavior from './interfaces/dynamicBehavior';
declare class King extends Piece implements DynamicBehavior {
    movementAlgorithms: null;
    moved: boolean;
    enemyKing: King;
    checks: Attack[];
    castleAvailableCallback: (direction: BoardDirection) => boolean;
    constructor(side: Side);
    loadMoveAlgorithms(): (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
    influenceEmptySquare: (square: Square) => boolean;
    influenceOccupiedSquare: (square: Square) => boolean;
}
export default King;
