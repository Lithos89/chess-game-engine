import { PieceKind, type Side } from '../../logic/Terms';
import MoveController from '../move/MoveController';
import BoardManager from '../board/BoardManager';
export declare class Game {
    readonly id: string;
    readonly playerSide: Side;
    private currentTurnSide;
    startingFormation: import("../../formation/structure/pieceCollection").PieceListings;
    boardManager: BoardManager;
    moveController: MoveController;
    captures: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    constructor(side: Side, id: string);
    takeTurn: () => void;
}
