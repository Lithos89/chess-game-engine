import Match from "./Match";

class MatchObserver {
  match: Match
  updateState: (state) => void
  
  // TODO: Update state once you've added 
  constructor(match: Match, updateStateCallback: (state) => void) {
    console.log(match);
    this.match = match
    this.updateState = updateStateCallback
  }

  update = () => {
    this.updateState(this.match.getMatchStats());
  }
}

export default MatchObserver;
