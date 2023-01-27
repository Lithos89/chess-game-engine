import { type MatchMode } from '../logic/concepts';
import { type Side } from '../logic/terms';
import Match from './match/Match';
declare class Session {
    private matches;
    private currentMatch;
    static getCurrentSession: () => Session;
    constructor();
    startNewMatch: (mode: MatchMode, primarySide?: Side | 'random') => string;
    private updateCurrentMatch;
    getCurrentMatch: () => Match;
}
export default Session;
