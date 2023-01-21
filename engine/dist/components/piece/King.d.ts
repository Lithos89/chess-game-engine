import { type BoardDirection, PieceKind } from '../../logic/terms';
import { Attack } from '../../logic/concepts';
import Piece from './Piece';
import Square from '../Square';
import DynamicBehavior from './interfaces/dynamicBehavior';
declare class King extends Piece implements DynamicBehavior {
    kind: PieceKind;
    movementAlgorithms: any;
    moved: boolean;
    enemyKing: King;
    checks: Attack[];
    private isCastleAvailable;
    loadMoveAlgorithms(): (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
    influenceEmptySquare: (square: Square) => boolean;
    influenceOccupiedSquare: (square: Square) => boolean;
    setCastleAvailableCallback(callback: (direction: BoardDirection) => boolean): void;
}
export default King;
