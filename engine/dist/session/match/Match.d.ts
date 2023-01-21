import { type Side } from '../../logic/terms';
import Game from '../game/Game';
import Observable from '../../state/observable';
declare class Match implements Observable {
    id: string;
    private games;
    private gameCount;
    private readonly wins;
    currentGame: Game;
    private selectedGameIndex;
    protected currentSide: Side;
    private readonly gameGenerator;
    private observer;
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
