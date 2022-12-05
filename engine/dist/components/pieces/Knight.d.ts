import { type Side } from '../../logic/Terms';
import Piece from './Piece';
declare class Knight extends Piece {
    constructor(side: Side);
    updateAvailableMoves: () => void;
}
export default Knight;
