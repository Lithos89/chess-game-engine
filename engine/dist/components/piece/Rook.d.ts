import { type Side } from '../../logic/terms';
import { type MoveLine } from '../../logic/algorithms/types';
import DynamicBehavior from './interfaces/dynamicBehavior';
import Piece from './Piece';
declare class Rook extends Piece implements DynamicBehavior {
    movementAlgorithms: null;
    moved: boolean;
    constructor(side: Side);
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => MoveLine[])[];
}
export default Rook;
