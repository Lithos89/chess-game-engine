import { type Side } from '../logic/terms';
import Match from './match/Match';
declare class Session {
    private matches;
    private currentMatch;
    static getCurrentSession: () => Session;
    constructor();
    startNewMatch: (playerSide?: Side) => string;
    private updateCurrentMatch;
    getCurrentMatch: () => Match;
}
export default Session;
