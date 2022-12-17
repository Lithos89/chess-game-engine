import Square from 'components/Square';
import BoardManager from '../board/BoardManager';
declare class MoveManager {
    private boardManager;
    private readonly moveLL;
    constructor(boardManager: BoardManager);
    takebackMove: () => void;
    commitMove: (origin: Square, dest: Square) => void;
}
export default MoveManager;
