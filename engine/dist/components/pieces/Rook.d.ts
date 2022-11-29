import { type Side } from '../../Terms';
import Piece from './Piece';
declare class Rook extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Rook;
