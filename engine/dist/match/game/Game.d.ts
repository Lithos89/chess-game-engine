import { PieceKind, type Side } from '../../logic/Terms';
import BoardController from '../board/BoardController';
export declare class Game {
    id: string;
    boardController: BoardController;
    playerSide: Side;
    captures: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    getGameSquares(): {
        [shortPosition: string]: import("../../components/Square").default;
    };
    constructor(side: Side, id: string);
}
