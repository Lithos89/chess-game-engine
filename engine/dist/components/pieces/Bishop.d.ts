import { type Side } from '../../Terms';
import Piece from './Piece';
declare class Bishop extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Bishop;
