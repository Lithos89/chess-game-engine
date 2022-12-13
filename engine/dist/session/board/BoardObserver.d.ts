import BoardManager from "./BoardManager";
declare class BoardObserver {
    boardManager: BoardManager;
    updateState: (state: any) => void;
    lastState: any;
    constructor(boardManager: BoardManager, updateStateCallback: (state: any) => void);
    setCallback: (callback: any) => void;
    update: (stuff: any) => void;
}
export default BoardObserver;
