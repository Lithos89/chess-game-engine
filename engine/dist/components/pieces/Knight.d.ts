import { type Side } from '../../Terms';
import Piece from './Piece';
declare class Knight extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Knight;
