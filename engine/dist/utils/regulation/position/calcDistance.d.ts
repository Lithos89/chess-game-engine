import { type ShortPosition, type Position } from '../../../logic/terms';
import Square from '../../../components/Square';
declare function calcDistance(pos1: ShortPosition, pos2: ShortPosition): number;
declare function calcDistance(pos1: Position, pos2: Position): number;
declare function calcDistance(square1: Square, square2: Square): number;
export default calcDistance;
