
// Types, interfaces, constants, ...
import { type Side } from '../logic/terms';

// Game Management
import Session from './Session';
import Match from './match/Match';

// State Management
import Observer from '../state/Observer';
import Game from './game/Game';

interface MatchController {
  newMatch: (playerSide: Side) => void,
  //?: Add here more properties as the app progresses
};

function startSession(): MatchController {
  const session = new Session();

  return ({
    newMatch: session.startNewMatch,
  });
};

function setMatchObserver(callback: (state: any) => void, match: Match) {
  Observer.matchObservers.get(match).setCallback(callback);
};

function setGameObserver(callback: (state: any) => void, game: Game) {
  console.log('here');
  console.log(game);
  Observer.gameObservers.get(game).setCallback(callback);
};

export default {startSession, setMatchObserver, setGameObserver};
