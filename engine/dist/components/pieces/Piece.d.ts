import { type Side, PieceKind } from '../../Terms';
export default abstract class Piece {
    abstract side: Side;
    kind: PieceKind;
    constructor(piece: PieceKind);
}
