import { type Side } from '../../logic/terms';
import Piece from './Piece';
declare class Knight extends Piece {
    movementAlgorithms: (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
    constructor(side: Side);
}
export default Knight;
