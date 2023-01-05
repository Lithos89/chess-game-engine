import { PieceKind, type Side } from '../../logic/terms';
import { BoardSquareListings } from '../../formation/structure/squareCollection';
import Square from '../../components/Square';
import MoveHistoryLL from './MoveHistoryLL';
declare class MoveManager {
    private updateState;
    readonly moveLL: MoveHistoryLL;
    captures: {
        [_side in Side]: {
            [_piece in Exclude<PieceKind, 'k'>]: number;
        };
    };
    constructor(updateState: (type?: string) => void);
    takebackMove: () => void;
    getMoveHistory: () => string[][];
    private capture;
    commitMove: (origin: Square, dest: Square) => void;
    updateMoves: (board: BoardSquareListings, sideLastMoved?: Side) => void;
    tempUpdateMoves(board: BoardSquareListings, sideLastMoved?: Side): void;
    private tempUpdateSideBasicPieces;
    private tempUpdateKings;
}
export default MoveManager;
