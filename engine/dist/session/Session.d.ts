import { type Side } from '../logic/Terms';
import Match from './match/Match';
declare class Session {
    private matches;
    private currentMatch;
    static getCurrentSession: () => Session;
    constructor(startingSide?: Side);
    startNewMatch: (playerSide?: Side) => Match;
    updateCurrentMatch: (index?: number) => void;
    getCurrentMatch: () => Match;
}
export default Session;
