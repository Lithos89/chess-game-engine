import { type Side, type BoardDirection } from '../../logic/terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import { Attack } from '../../logic/concepts';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';
declare class BoardManager {
    private updateState;
    boardSquares: BoardSquareListings;
    private squareHighlighting;
    kings: {
        [side in Side]: King;
    };
    private readonly getCurrentTurnSide;
    castleAvailabilityCallback: (side: Side) => (direction: BoardDirection) => boolean;
    constructor(startingFormation: PieceListings, flipped: boolean, currentTurnSideCallback: () => Side, updateState: () => void);
    private initBoard;
    private initPieces;
    private initSquares;
    compileBoard: () => BoardSquareCondensed[];
    highlightMoves: (piece?: Piece) => void;
    processAvailableMoves(checks: Attack[], sideLastMoved?: Side): void;
    private updatePieceMoves;
    private updateBasicPieces;
    private updateKings;
    private applyPins;
    commitCastle(king: King, direction: BoardDirection): void;
}
export default BoardManager;
