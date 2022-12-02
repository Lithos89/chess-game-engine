import { PieceKind, type Side } from '../../logic/Terms';
import BoardController from '../board/BoardController';
export declare class Game {
    readonly id: string;
    boardController: BoardController;
    readonly playerSide: Side;
    captures: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    constructor(side: Side, id: string);
    getGameSquares(): {
        [shortPosition: string]: import("../../components/Square").default;
    };
}
