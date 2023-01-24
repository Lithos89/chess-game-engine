import { type ShortPosition, type Side } from '../../logic/terms';
import Observable from '../../state/observable';
declare class Game implements Observable {
    readonly id: string;
    private readonly startingFormation;
    readonly playerSide: Side | null;
    protected currentTurnSide: Side;
    private turnCount;
    protected isOver: boolean;
    private boardManager;
    private moveManager;
    private observer;
    private moveController;
    protected signalFinish: (result: Side | 'draw') => (() => {});
    protected startNextGameCallback: () => void;
    constructor(id: string, side?: Side);
    signalState: (type?: string, data?: {}) => void;
    private takeTurn;
    protected attemptHighlight: (position?: ShortPosition) => boolean;
    protected attemptMove: (from: ShortPosition, to: ShortPosition) => boolean;
    protected genRandomMove: (side: Side) => any;
    protected undo: () => void;
    updateMoves: (sideLastMoved?: Side) => void;
}
export default Game;
