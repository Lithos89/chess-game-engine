import { type ShortPosition, type Side } from '../../logic/Terms';
import Observable from 'state/observable';
declare class Game implements Observable {
    readonly id: string;
    private readonly startingFormation;
    readonly playerSide: Side;
    private currentTurnSide;
    private turnCount;
    private boardManager;
    private moveManager;
    private observer;
    constructor(side: Side, id: string);
    signalState: (type?: string) => void;
    private takeTurn;
    protected attemptHighlight: (position?: ShortPosition) => boolean;
    protected attemptMove: (from: ShortPosition, to: ShortPosition) => boolean;
    protected undo: () => void;
}
export default Game;
