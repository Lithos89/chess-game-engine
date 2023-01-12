import { PieceKind, type Side } from '../../logic/terms';
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
}
export default MoveManager;
