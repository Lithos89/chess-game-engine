import { type Side } from '../Terms.js';
declare enum PieceKind {
    Pawn = "p",
    Rook = "r",
    Knight = "h",
    Bishop = "b",
    Queen = "q",
    King = "k"
}
export default abstract class Piece {
    abstract side: Side;
    kind: PieceKind;
    constructor(piece: PieceKind);
}
export {};
