import { type Side, PieceKind } from '../../logic/Terms';
import Square from '../Square';
declare abstract class Piece {
    side: Side;
    kind: PieceKind;
    static movePiece: (arg0: Square, arg1: Square) => {
        [shortPosition: string]: Square;
    };
    constructor(piece: PieceKind, side: Side);
    move(currentSquare: Square, destSquare: Square): {
        [shortPosition: string]: Square;
    };
}
export default Piece;
