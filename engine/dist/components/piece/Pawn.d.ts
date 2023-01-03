import { type Side } from '../../logic/terms';
import DynamicBehavior from './interfaces/dynamicBehavior';
import Piece from './Piece';
declare class Pawn extends Piece implements DynamicBehavior {
    private readonly direction;
    movementAlgorithms: null;
    moved: boolean;
    constructor(side: Side);
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => import("../../logic/algorithms/types").MoveLine[])[];
}
export default Pawn;
