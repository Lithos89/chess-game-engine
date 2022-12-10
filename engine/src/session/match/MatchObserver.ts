import Match from "./Match";

/*
  !: What needs to be done before further development
  TODO: 1. Clean up callback storage to exist in the match observer
  // TODO: 2. Fix the updating of the observer so that the it 
*/

class MatchObserver {
  match: Match
  updateState: (state) => void
  
  // TODO: Update state once you've added 
  constructor(match: Match, updateStateCallback: (state) => void) {
    console.log('here');
    console.log(match);
    this.match = match;
    this.updateState = updateStateCallback;
  }

  update = () => {
    this.updateState(this.match.getMatchStats());
  };
};

export default MatchObserver;
