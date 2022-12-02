import { type ShortPosition } from 'logic/Terms';
import Square from 'components/Square';
export default class MoveController {
    private boardSquares;
    constructor(squareListing: {
        [shortPosition: string]: Square;
    });
    requestMove: (from: ShortPosition, to: ShortPosition) => void;
    moveRequestCallback: (origin: Square, dest: Square) => void;
}
