import { type Side } from '../logic/Terms';
import { Game } from './game/Game';
export default class Match {
    games: Game[];
    selectedGameIndex: number;
    currentGame: Game;
    currentSide: Side;
    gameGenerator: any;
    private gameCount;
    readonly wins: {
        [user: string]: number;
    };
    constructor(side: Side);
    storeGame(game: Game): void;
    generateNextGame(startingSide: Side, id: string): Generator<Game, void, unknown>;
    resetGame: () => {
        [shortPosition: string]: import("../components/Square").default;
    };
    updateWins(result: Side | 'draw'): void;
}
