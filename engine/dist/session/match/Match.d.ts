import { type Side } from '../../logic/Terms';
import { Game } from '../game/Game';
export default class Match {
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
    getMatchStats: () => {
        wins: {
            player: number;
            opponent: number;
        };
        currentSide: Side;
        games: number;
    };
    private updateWins;
}
