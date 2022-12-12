
// Classes
import Session from './Session';

export function startSession():
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
  const session = new Session();

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
  match.currentGame.boardObserver.update();
  // match.gameCallback = callback;
};

