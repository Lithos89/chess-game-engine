import { type ShortPosition, type BoardDirection, type Position } from '../../../logic/terms';
declare function getBoardDirection(from: Position, to: Position, orientation: 'horizontal' | 'vertical'): BoardDirection | null;
declare function getBoardDirection(from: ShortPosition, to: ShortPosition, orientation: 'horizontal' | 'vertical'): BoardDirection | null;
export default getBoardDirection;
