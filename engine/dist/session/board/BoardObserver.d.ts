import BoardManager from "./BoardManager";
declare class BoardObserver {
    boardManager: BoardManager;
    updateState: (state: any) => void;
    constructor(boardManager: BoardManager, updateStateCallback: (state: any) => void);
    update: () => void;
}
export default BoardObserver;
