
// Types, interfaces, constants, ...
import { type Side } from '../logic/Terms';

// Classes
import Session from './Session';

export function startSession(side: Side = 'white'):
  // Return Type
  {
    // matchController: {
    //   newMatch: (updateBoardStateCallback: (data: BoardSquareCondensed[]) => void) => {
    //     move: (from: ShortPosition, to: ShortPosition) => boolean,
    //     select: (_position: ShortPosition) => void,
    //     undo: () => void,
    //   },
    //   resign,
    //   observe,
    // },
  }
  // Function
  {
  const session = new Session(side);

  const matchController = {
    newMatch: session.startNewMatch,
  };

  return matchController;
};

export function setMatchObserver(callback) {
  const match = Session.getCurrentSession().getCurrentMatch();
  match.setObserver(callback);
};

export function setGameObserver(callback) {
  const match = Session.getCurrentSession().getCurrentMatch();
  match.setGameStateCallback(callback)
  // match.gameCallback = callback;
};

