
// Types, interfaces, constants, ...
import { type Side } from '../logic/Terms';

// Classes
import Match from './match/Match';

/*
  !: Overview of what needs to be done before further development
  // TODO: 1. Get rid of the callback 
  // TODO: 2. Move starting a new game to Match
  TODO: 3. Implement an interface or type for the match controller

/*
  * session will be used so that broadcasts are appropriately handled
  * session will allow for the scaling up of the app in the case of multiple opponents
*/
class Session {
  private matches: Match[] = [];
  private currentMatch: Match;
  public static getCurrentSession: () => Session;
  constructor() {
    Session.getCurrentSession = () => this;
  };

  // ?: Could also add an 'opponent' parameter in the future (if players/different AI's become available)
  startNewMatch = (playerSide: Side = 'white') => {
    const match = new Match(playerSide);
    this.matches.push(match);
    this.updateCurrentMatch();

    return match;
  };

  updateCurrentMatch = (index: number = this.matches.length - 1) => {
    this.currentMatch = this.matches[index];
    // this.currentMatch.ob
    // !: Add in here a call to update the current match observer
    // ?: If this function were being used to its full potential, would also need to update the match observer
  };

  getCurrentMatch = (): Match => {
    if (this.currentMatch instanceof Match) {
      return this.currentMatch;
    } else {
      const exhaustiveCheck: never = this.currentMatch;
      throw new Error(exhaustiveCheck);
    };
  };
};

export default Session;
