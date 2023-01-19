import { type Side } from '../../logic/terms';
import GameController from '../game/GameController';
import Observable from 'state/observable';
declare class Match implements Observable {
    id: string;
    private games;
    private gameCount;
    currentGame: GameController;
    private selectedGameIndex;
    protected currentSide: Side;
    private readonly gameGenerator;
    private observer;
    private readonly wins;
    constructor(id: string, side: Side);
    startNewGame: () => void;
    resignGame: () => void;
    private generateNextGame;
    private storeGame;
    private getMatchStats;
    signalState: (type?: string) => void;
    private updateWins;
}
export default Match;
