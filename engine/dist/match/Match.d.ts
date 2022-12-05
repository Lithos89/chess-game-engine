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
        [user: string]: number;
    };
    constructor(side: Side);
    storeGame(game: Game): void;
    generateNextGame(startingSide: Side, id: string): Generator<Game, Game, Game>;
    getGame(index: number): Game;
    resetGame: () => void;
    updateWins(result: Side | 'draw'): void;
}
