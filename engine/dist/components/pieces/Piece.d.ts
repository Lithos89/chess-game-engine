import { type Side, PieceKind } from '../../logic/Terms';
import Square from '../Square';
export default abstract class Piece {
    abstract side: Side;
    kind: PieceKind;
    static movePiece: (arg0: Square, arg1: Square) => {
        [shortPosition: string]: Square;
    };
    constructor(piece: PieceKind);
    abstract move(currentSquare: Square, destSquare: Square): {
        [shortPosition: string]: Square;
    };
}
