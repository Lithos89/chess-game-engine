import { type Side } from '../../logic/terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece, { King } from '../../components/piece';
declare class BoardManager {
    private updateState;
    boardSquares: BoardSquareListings;
    private squareHighlighting;
    whiteKing: King;
    blackKing: King;
    private readonly getCurrentTurnSide;
    constructor(startingFormation: PieceListings, alt: boolean, currentTurnSideCallback: () => Side, updateState: () => void);
    private initBoard;
    private initPieces;
    private initSquares;
    compileBoard: () => BoardSquareCondensed[];
    highlightMoves: (piece?: Piece) => void;
}
export default BoardManager;
