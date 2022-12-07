import { type BoardSquareCondensed } from './../formation/structure/board';
import { ShortPosition } from './../logic/Terms';
import { type Side } from '../logic/Terms';
export declare function startSession(side?: Side): {
    matchController: {
        generateGame: (updateState: (data: BoardSquareCondensed[]) => void) => {
            move: (from: ShortPosition, to: ShortPosition) => boolean;
            select: (_position: ShortPosition) => void;
            undo: () => void;
        };
        observe: any;
        resign: any;
    };
};
