import { type ShortPosition, type Side } from '../../logic/Terms';
import BoardManager from '../board/BoardManager';
declare class Game {
    readonly id: string;
    private readonly startingFormation;
    readonly playerSide: Side;
    private currentTurnSide;
    private turnCount;
    boardManager: BoardManager;
    private moveManager;
    constructor(side: Side, id: string);
    private takeTurn;
    protected attemptHighlight: (position?: ShortPosition) => boolean;
    protected attemptMove: (from: ShortPosition, to: ShortPosition) => boolean;
    protected undo: () => void;
}
export default Game;
