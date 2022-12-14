import { type ShortPosition } from '../../logic/Terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/pieces';
import MoveManager from '../move/MoveManager';
import { Game } from '../game/Game';
import Observer from '../../observers/Observer';
import Observable from 'observers/interfaces/observable';
declare class BoardManager implements Observable {
    boardSquares: BoardSquareListings;
    moveManager: MoveManager;
    observer: Observer<BoardManager>;
    readonly updateBoard: (params: any) => void;
    constructor(game: Game);
    compileBoard: (highlightedSquarePositions?: ShortPosition[]) => BoardSquareCondensed[];
    signalState: (params?: any[]) => void;
    highlightAvailableSquares: (piece: Piece | undefined) => void;
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
export default BoardManager;
