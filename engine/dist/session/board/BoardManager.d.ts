import { type ShortPosition, type Side } from '../../logic/Terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/pieces';
import Observer from '../../observers/Observer';
import Observable from 'observers/interfaces/observable';
declare class BoardManager implements Observable {
    boardSquares: BoardSquareListings;
    observer: Observer<BoardManager>;
    private readonly getCurrentTurnSide;
    constructor(startingFormation: PieceListings, currentTurnSideCallback: () => Side);
    compileBoard: (highlightedSquarePositions?: ShortPosition[]) => BoardSquareCondensed[];
    signalState: (params?: any[]) => void;
    updateBoard: () => void;
    highlightAvailableSquares: (piece?: Piece) => void;
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
export default BoardManager;
