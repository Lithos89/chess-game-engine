
// Classes
import { Side } from 'logic/Terms';
import Observer from './Observer';
import Session from './Session';

export function startSession():
  // Return Type
  {
    newMatch: (playerSide: Side) => void,
    //?: Add here more properties as the app progresses
  }
  // Function
  {
  const session = new Session();

  return ({
    newMatch: session.startNewMatch,
  });
};

export function setMatchObserver(callback, match) {
  Observer.matchObservers.get(match).setCallback(callback);
};

// TODO: Need to remove class drilling by moving logic to the subclasses
export function setGameObserver(callback, game) {
  Observer.boardObservers.get(game.boardManager).setCallback(callback);
};

