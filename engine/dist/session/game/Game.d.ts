import { ShortPosition } from '../../logic/Terms';
import { PieceKind, type Side } from '../../logic/Terms';
declare class Game {
    readonly id: string;
    readonly playerSide: Side;
    private currentTurnSide;
    private startingFormation;
    private boardManager;
    private moveManager;
    captures: {
        [_side in Side]: {
            [_piece in PieceKind]: number;
        };
    };
    constructor(side: Side, id: string);
    private takeTurn;
    protected highlightPiece: (position?: ShortPosition) => boolean;
    protected move: (from: ShortPosition, to: ShortPosition) => boolean;
    protected undo: () => void;
}
export default Game;
