import { type ShortPosition } from '../../logic/Terms';
import Square from 'components/Square';
import MoveController from './MoveController';
declare class MoveManager {
    protected boardSquares: {
        [shortPosition: string]: Square;
    };
    readonly controller: MoveController;
    updateBoard: any;
    constructor(squareListing: {
        [shortPosition: string]: Square;
    }, boardUpdateCallback: any);
    commitMove: (from: ShortPosition, to: ShortPosition) => void;
    requestMove: (from: ShortPosition, to: ShortPosition) => void;
    moveRequestCallback: (origin: Square, dest: Square) => {
        [shortPosition: string]: Square;
    };
}
export default MoveManager;
