import { BoardSquareListings } from '../../formation/structure/squareCollection';
import { type ShortPosition } from '../../logic/Terms';
import MoveController from './MoveController';
import MoveHistoryLL from './MoveHistoryLL';
declare class MoveManager {
    protected boardSquares: BoardSquareListings;
    readonly controller: MoveController;
    moveLL: MoveHistoryLL;
    updateBoard: any;
    constructor(squareListing: BoardSquareListings, boardUpdateCallback: any, highlightBoard: any);
    takebackMove: () => void;
    commitMove: (from: ShortPosition, to: ShortPosition) => void;
}
export default MoveManager;
