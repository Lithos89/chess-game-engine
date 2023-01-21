import { PieceKind } from '../../logic/terms';
import Piece from './Piece';
declare class Knight extends Piece {
    kind: PieceKind;
    movementAlgorithms: (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
}
export default Knight;
