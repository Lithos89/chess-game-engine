import { type Side } from '../../logic/Terms';
import Square from 'components/Square';
import Piece from './Piece';
declare class Queen extends Piece {
    side: Side;
    constructor(side: Side);
    move(currentSquare: Square, destSquare: Square): void;
}
export default Queen;
