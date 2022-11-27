import Square from './logic/Square';
export declare class Game {
    squares: {
        [index: string]: Square;
    };
    constructor();
    private initializeGame;
    private initializeSquares;
}
