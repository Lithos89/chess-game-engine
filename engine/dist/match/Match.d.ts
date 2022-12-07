import { type Side } from '../logic/Terms';
import { Game } from './game/Game';
export default class Match {
    private games;
    selectedGameIndex: number;
    currentGame: Game;
    currentSide: Side;
    gameGenerator: Generator<Game, Game, Game>;
    private gameCount;
    readonly wins: {
        player: number;
        opponent: number;
    };
    constructor(side: Side);
    storeGame(game: Game): void;
    generateNextGame(startingSide: Side, id: string, matchLength?: number): Generator<Game, Game, Game>;
    getGame(index: number): Game;
    getMatchStats(): {
        wins: {
            player: number;
            opponent: number;
        };
        currentSide: "white" | "black";
    };
    resignGame: () => void;
    updateWins(result: Side | 'draw'): void;
}
