import { ShortPosition } from "logic/Terms";
import { BoardSquareListings } from '../../formation/structure/squareCollection';
declare class MoveController {
    boardPositions: BoardSquareListings;
    private commitMove;
    private highlightBoard;
    private selectedPiece;
    undo: () => void;
    constructor(boardPositions: BoardSquareListings, commitMove: any, highlightBoard: any, takebackMove: () => void);
    selectPiece: (position: ShortPosition) => void;
    requestMove: (from: ShortPosition, to: ShortPosition) => boolean;
}
export default MoveController;
