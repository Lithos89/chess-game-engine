import { ShortPosition } from "logic/Terms";
import MoveManager from "./MoveManager";
import BoardManager from "../board/BoardManager";
declare class MoveController {
    private moveManager;
    private boardManager;
    private selectedPiece;
    undo: () => void;
    constructor(moveManager: MoveManager, boardManager: BoardManager);
    selectPiece: (position: ShortPosition) => void;
    requestMove: (from: ShortPosition, to: ShortPosition) => boolean;
}
export default MoveController;
