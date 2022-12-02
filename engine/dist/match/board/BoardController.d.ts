import { type PieceListings } from '../../formation/structure';
import Square from '../../components/Square';
import MoveController from '../move/MoveController';
export default class BoardController {
    boardSquares: {
        [shortPosition: string]: Square;
    };
    moveController: MoveController;
    constructor(startingFormation: PieceListings);
    private createPiece;
    private initializeBoard;
    private initializeSquares;
}
