import { type Side } from '../../logic/Terms';
import Piece from './Piece';
declare class Queen extends Piece {
    constructor(side: Side);
    updateLegalLines: () => void;
}
export default Queen;
