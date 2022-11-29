import { PieceKind, Side } from './Terms';
import { PieceListing } from './formation/structure';
import Square from './components/Square';
import Piece from './components/pieces';
export declare class Game {
    boardSquares: {
        [shortPosition: string]: Square;
    };
    captured: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    requestMove(caller: Piece, target: Square): void;
    constructor();
    createPiece({ kind, side }: PieceListing): Piece | null;
    private initializeBoard;
    private initializeSquares;
}
