
// Types, interfaces, constants, ...
import { type Side } from '../logic/Terms';

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

// TODO: Need to remove class drilling by moving logic to the subclasses
function setGameObserver(callback: (state: any) => void, game: Game) {
  Observer.gameObservers.get(game).setCallback(callback);
};

export default {startSession, setMatchObserver, setGameObserver};
