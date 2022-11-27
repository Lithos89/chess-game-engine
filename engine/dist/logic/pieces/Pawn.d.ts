import { type Side } from '../Terms.js';
import Piece from './Piece.js';
declare class Pawn extends Piece {
    side: Side;
    constructor(side: Side);
}
export default Pawn;
