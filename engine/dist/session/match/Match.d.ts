import { type Side } from '../../logic/Terms';
import { Game } from '../game/Game';
import Observable from 'observers/interfaces/observable';
export default class Match implements Observable {
    private games;
    private gameCount;
    currentGame: Game;
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
