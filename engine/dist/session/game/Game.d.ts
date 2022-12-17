import { type ShortPosition, type Side } from '../../logic/Terms';
declare class Game {
    readonly id: string;
    readonly playerSide: Side;
    private currentTurnSide;
    private turnCount;
    private boardManager;
    private moveManager;
    constructor(side: Side, id: string);
    private takeTurn;
    protected attemptHighlight: (position?: ShortPosition) => boolean;
    protected attemptMove: (from: ShortPosition, to: ShortPosition) => boolean;
    protected undo: () => void;
}
export default Game;
