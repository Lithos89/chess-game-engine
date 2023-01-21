import { PieceKind } from '../../logic/terms';
import DynamicBehavior from './interfaces/dynamicBehavior';
import Piece from './Piece';
declare class Rook extends Piece implements DynamicBehavior {
    kind: PieceKind;
    movementAlgorithms: null;
    moved: boolean;
    loadMoveAlgorithms: () => (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
}
export default Rook;
