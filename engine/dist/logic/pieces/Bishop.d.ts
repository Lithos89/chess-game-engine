import { type Side } from '../Terms.js';
import Piece from './Piece.js';
declare class Bishop extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Bishop;
