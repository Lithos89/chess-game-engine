import { type Side } from '../../logic/Terms';
import Piece from './Piece';
import Movable from 'session/move/interfaces/movable';
declare class King extends Piece implements Movable {
    moved: boolean;
    constructor(side: Side);
    updateLegalLines: () => void;
}
export default King;
