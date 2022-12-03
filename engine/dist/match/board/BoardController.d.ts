import { type PieceListings } from '../../formation/structure';
import Square from '../../components/Square';
import MoveManager from '../move/MoveManager';
export default class BoardController {
    boardSquares: {
        [shortPosition: string]: Square;
    };
    moveManager: MoveManager;
    constructor(startingFormation: PieceListings);
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
