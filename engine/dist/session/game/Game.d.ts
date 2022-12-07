import { PieceKind, type Side } from '../../logic/Terms';
export declare class Game {
    readonly id: string;
    readonly playerSide: Side;
    private currentTurnSide;
    startingFormation: import("../../formation/structure/pieceCollection").PieceListings;
    captures: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    constructor(side: Side, id: string);
    takeTurn: () => void;
}
