import { type Side } from '../logic/terms';
import { type MatchMode } from '../logic/concepts';
interface MatchController {
    newMatch: (mode: MatchMode, primarySide?: Side) => void;
}
declare function startSession(): MatchController;
declare function setMatchObserver(callback: (state: any) => void, matchId: string): void;
declare function setGameObserver(callback: (state: any) => void, gameId: string): void;
declare const _default: {
    startSession: typeof startSession;
    setMatchObserver: typeof setMatchObserver;
    setGameObserver: typeof setGameObserver;
};
export default _default;
