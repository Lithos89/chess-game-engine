import { type ShortPosition } from 'logic/Terms';
import Square from 'components/Square';
import MoveController from './MoveController';
declare class MoveManager {
    protected boardSquares: {
        [shortPosition: string]: Square;
    };
    readonly controller: MoveController;
    constructor(squareListing: {
        [shortPosition: string]: Square;
    });
    requestMove: (from: ShortPosition, to: ShortPosition) => void;
    moveRequestCallback: (origin: Square, dest: Square) => {
        [shortPosition: string]: Square;
    };
}
export default MoveManager;
