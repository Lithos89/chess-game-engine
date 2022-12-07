import { BoardSquareCondensed } from '../../formation/structure/board';
import { BoardSquareListings } from '../../formation/structure/squareCollection';
import { Game } from '../game/Game';
import { type ShortPosition } from '../../logic/Terms';
import Piece from '../../components/pieces';
import MoveManager from '../move/MoveManager';
export default class BoardController {
    boardSquares: BoardSquareListings;
    moveManager: MoveManager;
    updateBoard: (params: any) => void;
    private setSubscription;
    compileBoard: (highlightedSquarePositions?: ShortPosition[]) => BoardSquareCondensed[];
    constructor(game: Game, stateUpdateFunc: any);
    highlightAvailableSquares: (piece: Piece | undefined) => void;
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
