import { type Side } from '../../logic/terms';
import Piece from './Piece';
declare class Bishop extends Piece {
    movementAlgorithms: (({ row, col }: import("../../logic/terms").Position) => import("../../logic/algorithms/types").MoveLine[])[];
    constructor(side: Side);
}
export default Bishop;
