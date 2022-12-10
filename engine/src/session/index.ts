
// Types, interfaces, constants, ...
import { type BoardSquareCondensed } from '../formation/structure/board';
import { type ShortPosition, type Side } from '../logic/Terms';

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

  console.info("test me");


  // *: At the moment, you cannot start a new match, therefore passing in a static match works
  const matchController = {
    newMatch: session.startNewMatch,
    // resign: session.resign,
    // setObserver: session.setMatchObserver,
  };



  return matchController;
};

