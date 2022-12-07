import { type BoardSquareCondensed } from '../formation/structure/board';
import { ShortPosition } from '../logic/Terms';
import { type Side } from '../logic/Terms';

// Classes
import Match from './match/Match';
import { Game } from './game/Game';
import BoardController from './board/BoardController';
import MatchObserver from './match/MatchObserver';

// session will be used so that broadcasts are appropriately handled
// session will allow for the scaling up of the app in the case of multiple opponents
class Session {
  private matches: Match[] = []
  currentMatch: Match
  matchObserver: MatchObserver
  tempCallback
  
  constructor(startingSide: Side = 'white') {
    this.startNewMatch(startingSide)
  };

  resign = () => {
    this.currentMatch.resignGame();
    const moveController = this.startNewGame(this.tempCallback);
    this.matchObserver.update();
    return moveController;
  }

  // ?: Could also add an 'opponent' parameter in the future
  startNewMatch(playerSide: Side = 'white') {
    const match = new Match(playerSide);
    this.matches.push(match);
    this.updateCurrentMatch();
  }

  updateCurrentMatch(index: number = this.matches.length - 1) {
    this.currentMatch = this.matches[index];
  }

  setMatchObserver = (updateMatchStateCallback) => {
    this.matchObserver = new MatchObserver(this.currentMatch, updateMatchStateCallback);
    this.matchObserver.update();
  }

  startNewGame = (updateBoardStateCallback: (boardState: BoardSquareCondensed[]) => void) => {
    const moveController = this.currentMatch.startNewGame(updateBoardStateCallback);
    this.tempCallback = updateBoardStateCallback;
    this.matchObserver.update();
    return moveController;
  }
};

export function startSession(side: Side = 'white'):
  // Return Type
  {
    matchController: {
      generateGame: (updateBoardStateCallback: (data: BoardSquareCondensed[]) => void, updateMatchStateCallback) => {
        move: (from: ShortPosition, to: ShortPosition) => boolean,
        select: (_position: ShortPosition) => void,
        undo: () => void,
      },
      resign,
      observe,
    }
  }
  // Function
  {
  const session = new Session(side);


  // *: At the moment, you cannot start a new match, therefore passing in a static match works
  const matchController = {
    generateGame: session.startNewGame,
    resign: session.resign,
    observe: session.setMatchObserver,
  };

  return { matchController };
};
