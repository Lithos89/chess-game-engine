import { BoardSquareCondensed } from "formation/structure/board";
import BoardManager from "./BoardManager";
declare class BoardObserver {
    boardManager: BoardManager;
    updateState: (state: any) => void;
    constructor(boardManager: BoardManager, updateStateCallback: (state: any) => void);
    setCallback: (callback: any) => void;
    update: (state: BoardSquareCondensed) => void;
}
export default BoardObserver;
