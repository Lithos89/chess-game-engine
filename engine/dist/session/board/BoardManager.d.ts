import { type ShortPosition } from '../../logic/Terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/pieces';
import MoveManager from '../move/MoveManager';
import { Game } from '../game/Game';
declare class BoardManager {
    boardSquares: BoardSquareListings;
    moveManager: MoveManager;
    updateBoard: (params: any) => void;
    private setSubscription;
    compileBoard: (highlightedSquarePositions?: ShortPosition[]) => BoardSquareCondensed[];
    constructor(game: Game, stateUpdateFunc: any);
    setObserver: (stateUpdateFunc: any) => void;
    update: (params: any) => void;
    highlightAvailableSquares: (piece: Piece | undefined) => void;
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
export default BoardManager;
