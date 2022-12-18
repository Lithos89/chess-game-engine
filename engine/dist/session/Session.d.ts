import { type Side } from '../logic/Terms';
import Match from './match/Match';
declare class Session {
    private matches;
    private currentMatch;
    static getCurrentSession: () => Session;
    constructor();
    startNewMatch: (playerSide?: Side) => Match;
    private updateCurrentMatch;
    getCurrentMatch: () => Match;
}
export default Session;
