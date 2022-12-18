import { type Side } from '../../logic/Terms';
import Piece from './Piece';
declare class Pawn extends Piece {
    constructor(side: Side);
    updateAvailableMoves: () => void;
}
export default Pawn;
