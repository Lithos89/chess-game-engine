import { type Side } from '../../logic/Terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/pieces';
import Observable from 'observers/interfaces/observable';
declare class BoardManager implements Observable {
    boardSquares: BoardSquareListings;
    private observer;
    private captures;
    private readonly getCurrentTurnSide;
    constructor(startingFormation: PieceListings, currentTurnSideCallback: () => Side);
    private initializeBoard;
    private initializeSquares;
    signalState: (params?: any[]) => void;
    updateBoard: () => void;
    private compileBoard;
    highlightAvailableMoves: (piece?: Piece) => void;
}
export default BoardManager;
