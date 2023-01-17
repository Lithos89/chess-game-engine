import { BoardDirection } from './../../logic/terms';
import { type Side, PieceKind } from '../../logic/terms';
import Square from '../../components/Square';
import King from '../../components/piece/King';
import MoveHistoryLL from './MoveHistoryLL';
declare class MoveManager {
    private updateState;
    private commitCastle;
    readonly moveLL: MoveHistoryLL;
    captures: {
        [_side in Side]: {
            [_piece in Exclude<PieceKind, 'k'>]: number;
        };
    };
    constructor(updateState: (type?: string) => void, commitCastle: (king: King, direction: BoardDirection) => void);
    takebackMove: () => void;
    getMoveHistory: () => string[][];
    private capture;
    commitMove: (origin: Square, dest: Square) => void;
}
export default MoveManager;
