import BoardManager from './board/BoardManager';
import BoardObserver from './board/BoardObserver';
import Match from './match/Match';
import MatchObserver from "./match/MatchObserver";
declare class Observer {
    static matchObservers: Map<Match, MatchObserver>;
    static boardObservers: Map<BoardManager, BoardObserver>;
    static setMatchObserver(match: Match, updateStateCallback?: (state: any) => void): void;
    static setBoardObserver: (boardManager: BoardManager, updateStateCallback?: (state: any) => void) => void;
}
export default Observer;
