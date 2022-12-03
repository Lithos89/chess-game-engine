import { type ShortPosition } from 'logic/Terms';
import Square from 'components/Square';
declare class MoveManager {
    private boardSquares;
    constructor(squareListing: {
        [shortPosition: string]: Square;
    });
    requestMove: (from: ShortPosition, to: ShortPosition) => void;
    moveRequestCallback: (origin: Square, dest: Square) => {
        [shortPosition: string]: Square;
    };
}
export default MoveManager;
