import { type Side } from '../../logic/Terms';
import Observable from 'observers/interfaces/observable';
import GameController from '../game/GameController';
declare class Match implements Observable {
    private games;
    private gameCount;
    currentGame: GameController;
    private selectedGameIndex;
    protected currentSide: Side;
    private readonly gameGenerator;
    private observer;
    private readonly wins;
    constructor(side: Side);
    startNewGame: () => void;
    resignGame: () => void;
    private generateNextGame;
    private storeGame;
    private getMatchStats;
    signalState: () => void;
    private updateWins;
}
export default Match;
