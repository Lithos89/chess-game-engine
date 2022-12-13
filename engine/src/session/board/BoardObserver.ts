import { BoardSquareCondensed } from "formation/structure/board";
import BoardManager from "./BoardManager";

class BoardObserver {
  boardManager: BoardManager;
  updateState: (state: any) => void;

  constructor(boardManager: BoardManager, updateStateCallback: (state: any) => void) {
    this.boardManager = boardManager;
    this.updateState = updateStateCallback;
  };

  setCallback = (callback) => {
    this.updateState = callback;
    this.boardManager.update();
  };

  update = (state: BoardSquareCondensed) => {
    console.info("Board State Updated");
    this.updateState(state);
  };
}

export default BoardObserver;
