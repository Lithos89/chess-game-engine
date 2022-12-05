import { ShortPosition } from "logic/Terms";
import Movable from "./interfaces/Movable";
import Square from "components/Square";
declare class MoveController {
    boardPositions: {
        [shortPosition: string]: Square;
    };
    constructor(boardPositions: {
        [shortPosition: string]: Square;
    });
    trackBackward: () => void;
    trackForward: () => void;
    commitMove: (piece: Movable) => void;
    requestMove: (from: ShortPosition, to: ShortPosition) => void;
    moveRequestCallback: (origin: Square, dest: Square) => {
        [shortPosition: string]: Square;
    };
}
export default MoveController;
