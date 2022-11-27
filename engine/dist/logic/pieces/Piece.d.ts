import { type Side } from '../Terms.js';
declare enum PieceKind {
    Pawn = "p",
    Rook = "r",
    Knight = "k",
    Bishop = "b",
    Queen = "q",
    King = "k"
}
declare abstract class Piece {
    abstract side: Side;
    kind: PieceKind;
    constructor(piece: PieceKind);
    getAvailablePositions(): void;
}
export default Piece;
