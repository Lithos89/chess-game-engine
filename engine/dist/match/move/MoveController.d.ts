import { ShortPosition } from "logic/Terms";
import Square from "components/Square";
declare class MoveController {
    boardPositions: {
        [shortPosition: string]: Square;
    };
    commitMove: any;
    constructor(boardPositions: {
        [shortPosition: string]: Square;
    }, commitMove: any);
    trackBackward: () => void;
    trackForward: () => void;
    requestMove: (from: ShortPosition, to: ShortPosition) => boolean;
    moveRequestCallback: (origin: Square, dest: Square) => {
        [shortPosition: string]: Square;
    };
}
export default MoveController;
