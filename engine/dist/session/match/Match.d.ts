import { type Side } from '../../logic/terms';
import { type MatchMode } from '../../logic/concepts';
import Game from '../game/Game';
import Observable from '../../state/observable';
declare class Match implements Observable {
    private readonly mode;
    id: string;
    private games;
    private gameCount;
    private readonly wins;
    currentGame: Game;
    private selectedGameIndex;
    protected currentSide: Side;
    private readonly gameGenerator;
    private observer;
    constructor(id: string, side: Side, mode: MatchMode);
    startNewGame: () => void;
    private generateNextGame;
    private storeGame;
    private getMatchStats;
    private updateWins;
    signalState: (type?: string) => void;
}
export default Match;
