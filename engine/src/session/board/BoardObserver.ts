import BoardManager from "./BoardManager";

class BoardObserver {
  boardManager: BoardManager;
  updateState: (state) => void;

  constructor(boardManager: BoardManager, updateStateCallback: (state) => void) {
    this.boardManager = boardManager;
    this.updateState = updateStateCallback;
  };

  update = () => {
    this.updateState(this.boardManager.compileBoard);
  };
}

export default BoardObserver;
