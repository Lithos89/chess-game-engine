import { type ShortPosition, type Position } from '../../../logic/terms';
declare function convertPosition(position: ShortPosition): Position;
declare function convertPosition(position: Position): ShortPosition;
export default convertPosition;
