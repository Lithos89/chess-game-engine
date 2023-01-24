
// Types, interfaces, constants, ...
import { type Side } from '../logic/terms';
import { type MatchMode } from '../logic/concepts';

// Game Management
import Session from './Session';

// State Management
import Observer from '../state/Observer';

interface MatchController {
  newMatch: (mode: MatchMode, primarySide?: Side) => void,
  //?: Add here more properties as the app progresses
};

function startSession(): MatchController {
  const session = new Session();

  return ({
    newMatch: session.startNewMatch,
  });
};

function setMatchObserver(callback: (state: any) => void, matchId: string) {
  Observer.matchObservers.get(matchId).setCallback(callback);
};

function setGameObserver(callback: (state: any) => void, gameId: string) {
  Observer.gameObservers.get(gameId).setCallback(callback);
};

export default {startSession, setMatchObserver, setGameObserver};
