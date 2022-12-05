import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';
import Movable from '../../match/move/interfaces/Movable';
import Square from '../Square';
declare abstract class Piece implements Movable {
    side: Side;
    kind: PieceKind;
    position: Position;
    availableMoves: ShortPosition[];
    static movePiece: (arg0: Square, arg1: Square) => {
        [shortPosition: string]: Square;
    };
    constructor(piece: PieceKind, side: Side);
    abstract updateAvailableMoves(): void;
    getAvailablePositions(...searchAlgorithms: ((_position: Position) => ShortPosition[])[]): ShortPosition[];
    move(currentSquare: Square, destSquare: Square): {
        [shortPosition: string]: Square;
    };
}
export default Piece;
