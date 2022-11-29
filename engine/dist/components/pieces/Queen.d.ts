import { type Side } from '../../Terms';
import Piece from './Piece';
declare class Queen extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Queen;
