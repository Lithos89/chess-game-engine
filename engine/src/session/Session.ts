
// Types, interfaces, constants, ...
import { type BoardSquareCondensed } from '../formation/structure/board';
import { type ShortPosition, type Side } from '../logic/Terms';

// Classes
import Match from './match/Match';

// Observers
import MatchObserver from './match/MatchObserver';

/*
  !: Overview of what needs to be done before further development
  TODO: 1. Get rid of the callback 
  TODO: 2. Move starting a new game to Match
  TODO: 3. Implement an inteface or type for the match controller

/*
  *: session will be used so that broadcasts are appropriately handled
  *: session will allow for the scaling up of the app in the case of multiple opponents
*/
class Session {
  private matches: Match[] = [];
  currentMatch: Match; // ?: See if I can make this private
  
  constructor(startingSide: Side = 'white') {
    // Start new match is only called on init because there is only one opponent
    // this.startNewMatch(startingSide);
  };

  // ?: Could also add an 'opponent' parameter in the future (if players/different AI's become available)
  startNewMatch = (playerSide: Side = 'white') => {
    const match = new Match(playerSide);
    this.matches.push(match);
    this.updateCurrentMatch();
    console.log("hi: " + this.matches.length);
    return {resignGame: this.currentMatch.resignGame, startNewGame: this.currentMatch.startNewGame, setObserver: this.currentMatch.setObserver };
  };

  updateCurrentMatch = (index: number = this.matches.length - 1) => {
    this.currentMatch = this.matches[index];
    // ?: If this function were being used to its full potential, would also need to update the match observer
  };
};

export default Session;
