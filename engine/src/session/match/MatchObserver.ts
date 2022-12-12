import Match from "./Match";

/*
  !: What needs to be done before further development
  TODO: 1. Clean up callback storage to exist in the match observer
*/

class MatchObserver {
  match: Match
  updateState: (state) => void
  
  // TODO: Update state once you've added 
  constructor(match: Match, updateStateCallback: (state) => void) {
    this.match = match;
    this.updateState = updateStateCallback;
  }

  update = () => {
    this.updateState(this.match.getMatchStats());
  };
};

export default MatchObserver;
