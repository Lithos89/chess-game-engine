import Square from 'components/Square';
import MoveHistoryLL from './MoveHistoryLL';
import BoardManager from '../board/BoardManager';
declare class MoveManager {
    private boardManager;
    readonly moveLL: MoveHistoryLL;
    constructor(boardManager: BoardManager);
    takebackMove: () => void;
    commitMove: (origin: Square, dest: Square) => void;
}
export default MoveManager;
