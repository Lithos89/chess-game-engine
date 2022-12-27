import { type Side } from '../../logic/Terms';
import Movable from 'session/move/interfaces/movable';
import Piece from './Piece';
declare class Rook extends Piece implements Movable {
    moved: boolean;
    constructor(side: Side);
    updateLegalLines: () => void;
}
export default Rook;
