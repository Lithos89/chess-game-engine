import { type Side } from '../../logic/terms';
import Piece from './Piece';
import DynamicBehavior from './interfaces/dynamicBehavior';
declare class King extends Piece implements DynamicBehavior {
    movementAlgorithms: null;
    moved: boolean;
    constructor(side: Side);
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => import("../../logic/algorithms/types").MoveLine[])[];
}
export default King;
