import { PieceKind } from '../../logic/terms';
import Piece from './Piece';
declare class Queen extends Piece {
    kind: PieceKind;
    movementAlgorithms: (({ row, col }: import("../../logic/terms").Position) => import("../../logic/concepts").MoveLine[])[];
}
export default Queen;
