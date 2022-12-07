import { type BoardSquareCondensed } from '../formation/structure/board';
import { ShortPosition } from '../logic/Terms';
import { type Side } from '../logic/Terms';
export declare function startSession(side?: Side): {
    matchController: {
        generateGame: (updateBoardStateCallback: (data: BoardSquareCondensed[]) => void, updateMatchStateCallback: any) => {
            move: (from: ShortPosition, to: ShortPosition) => boolean;
            select: (_position: ShortPosition) => void;
            undo: () => void;
        };
        resign: any;
        observe: any;
    };
};
