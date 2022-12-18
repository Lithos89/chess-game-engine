import { type Side } from '../logic/Terms';
import Match from './match/Match';
import Game from './game/Game';
interface MatchController {
    newMatch: (playerSide: Side) => void;
}
declare function startSession(): MatchController;
declare function setMatchObserver(callback: (state: any) => void, match: Match): void;
declare function setGameObserver(callback: (state: any) => void, game: Game): void;
declare const _default: {
    startSession: typeof startSession;
    setMatchObserver: typeof setMatchObserver;
    setGameObserver: typeof setGameObserver;
};
export default _default;
