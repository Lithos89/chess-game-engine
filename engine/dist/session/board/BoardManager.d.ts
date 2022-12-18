import { type Side } from '../../logic/Terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/piece';
import Observable from 'state/observable';
declare class BoardManager implements Observable {
    boardSquares: BoardSquareListings;
    private squareHighlighting;
    private observer;
    private captures;
    private readonly getCurrentTurnSide;
    constructor(startingFormation: PieceListings, alt: boolean, currentTurnSideCallback: () => Side);
    private initBoard;
    private initPieces;
    private initSquares;
    signalState: (type?: string) => void;
    notifyBoardUpdated: () => void;
    private compileBoard;
    highlightMoves: (piece?: Piece) => void;
}
export default BoardManager;
