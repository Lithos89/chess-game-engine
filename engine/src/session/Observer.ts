import BoardManager from './board/BoardManager';
import BoardObserver from './board/BoardObserver';
import Match from './match/Match';
import MatchObserver from "./match/MatchObserver";

class Observer {
  static matchObservers: Map<Match, MatchObserver> = new Map();
  static boardObservers: Map<BoardManager, BoardObserver> = new Map();

  static setMatchObserver(match: Match, updateStateCallback: (state) => void = () => {}) {
    this.matchObservers.set(match, new MatchObserver(match, updateStateCallback));
    return this.matchObservers.get(match);
  };

  static setBoardObserver = (boardManager: BoardManager, updateStateCallback: (state) => void = () => {}) => {
    this.boardObservers.set(boardManager, new BoardObserver(boardManager, updateStateCallback));
    return this.boardObservers.get(boardManager);
  };
};

export default Observer;
