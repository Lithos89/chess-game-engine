import { type Side } from '../../Terms';
import Piece from './Piece';
declare class Pawn extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Pawn;
