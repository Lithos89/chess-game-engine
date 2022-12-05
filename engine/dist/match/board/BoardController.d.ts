import { Game } from './../game/Game';
import Square from '../../components/Square';
import MoveManager from '../move/MoveManager';
export default class BoardController {
    boardSquares: {
        [shortPosition: string]: Square;
    };
    moveManager: MoveManager;
    updateBoard: () => void;
    private setSubscription;
    compileBoard: () => any[];
    constructor(game: Game, stateUpdateFunc: any);
    highlightAvailableSquares: () => void;
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
