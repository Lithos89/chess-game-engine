import { type Side } from '../../Terms';
import Piece from './Piece';
declare class King extends Piece {
    side: Side;
    constructor(side: Side);
}
export default King;
