
// Types, interfaces, constants, ...
import { type Side } from '../logic/terms';

// Game Management
import Match from './match/Match';

/*
  * session will be used so that broadcasts are appropriately handled
  * session will allow for the scaling up of the app in the case of multiple opponents
*/
class Session {
  private matches: Match[] = [];
  private currentMatch: Match; //?: Could change to an array of active matches to allow for more than one match to be played at the same time
  public static getCurrentSession: () => Session;

  constructor() {
    Session.getCurrentSession = () => this;
  };

  // ?: Could also add an 'opponent' parameter in the future (if players/different AI's become available)
  public startNewMatch = (playerSide: Side = 'white'): string => {
    const matchId = `match_${this.matches.length}`;
    const match = new Match(matchId, playerSide);
    this.matches.push(match);
    this.updateCurrentMatch();

    return match.id;
  };

  // ?: Could make it so that it update the currently active matches, allowing for more than one match to be active at the same time
  private updateCurrentMatch(index: number = this.matches.length - 1) {
    this.currentMatch = this.matches[index];
  };

  // ?: Could use an index system to get an active match from the active matches array
  public getCurrentMatch = (): Match => {
    if (this.currentMatch instanceof Match) {
      return this.currentMatch;
    } else {
      const exhaustiveCheck: never = this.currentMatch;
      throw new Error(exhaustiveCheck);
    };
  };
};

export default Session;
