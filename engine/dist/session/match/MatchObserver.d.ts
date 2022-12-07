import Match from "./Match";
declare class MatchObserver {
    match: Match;
    updateState: (state: any) => void;
    constructor(match: Match, updateStateCallback: (state: any) => void);
    update: () => void;
}
export default MatchObserver;
