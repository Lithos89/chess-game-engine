import { type Side } from '../../logic/terms';
import DynamicBehavior from './interfaces/dynamicBehavior';
import Piece from './Piece';
declare class Rook extends Piece implements DynamicBehavior {
    movementAlgorithms: null;
    moved: boolean;
    constructor(side: Side);
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
}
export default Rook;
