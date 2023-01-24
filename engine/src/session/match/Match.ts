
// Types, interfaces, constants, ...
import { type Side } from '../../logic/terms';
import { type MatchMode } from '../../logic/concepts';

// Game Management
import Game from '../game/Game';
import GameController from '../game/GameController';

// State Management
import Observer from '../../state/Observer';
import Observable from '../../state/observable';

// Utils
import getEnemySide from '../../utils/regulation/side/getEnemySide';

interface MatchStats {
  wins: {
    player: number,
    opponent: number
  },
  currentSide: Side,
  games: number,
};

// *: Class that governs a series of games between an opponent
class Match implements Observable {
  public id: string;

  private games: Game[] = [];
  private gameCount: number = 0;

  // *: In the case of a tie, add 0.5 to each side
  private readonly wins: { player: number, opponent: number } = {
    player: 0,
    opponent: 0,
  };

  public currentGame: Game;
  private selectedGameIndex: number = 0;
  protected currentSide: Side;
  private readonly gameGenerator: Generator<unknown, void, Game>;

  private observer: Observer<Match>;

  constructor(
    id: string,
    side: Side,
    private readonly mode: MatchMode
  ) {
    this.id = id;
    this.gameGenerator = this.generateNextGame(side, id);
    this.observer = new Observer(this);
  };


  /*--------------------------------------------GAME MANAGEMENT---------------------------------------------*/

  public startNewGame = () => {
    this.gameGenerator.next();
  };

  private * generateNextGame(startingSide: Side, id: string, matchLength: number = 100): Generator<unknown, void, Game> {
    let side: Side = startingSide;

    while (this.games.length < matchLength) {
      const gameID = `${id}_${side}_${this.gameCount}`;
      const gameSide = this.mode === 'local' ? null : side;

      const newGame = new GameController(gameID, gameSide, this.updateWins);
      this.storeGame(newGame, side);
      yield newGame;
      side = getEnemySide(side);
    };

    return;
  };

  private storeGame(game: Game, primarySide: Side) {
    // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
    this.currentGame = game;
    this.games.push(game);

    this.currentSide = primarySide;
    this.gameCount += 1;

    this.signalState('current-game');
  };

  
  /*-----------------------------------------------MATCH INFO----------------------------------------------------*/

  private getMatchStats = (): MatchStats => ({
    wins: this.wins,
    currentSide: this.currentSide,
    games: this.games.length,
  });

  private updateWins = (result: Side | 'draw'): (() => void) => {
    if (result === 'draw') {
      this.wins.player += 0.5;
      this.wins.opponent += 0.5;
    } else {
      const playerWon = result === this.currentSide;
      
      if (playerWon)
        this.wins.player += 1;
      else
        this.wins.opponent += 1;
    };

    this.signalState('info');
    return this.startNewGame;
  };


  /*-------------------------------------------STATE MANAGEMENT---------------------------------------------*/

  public signalState = (type?: string) => {
    switch (type) {
      case 'info': {
        const matchInfo = this.getMatchStats();
        this.observer.commitState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            info: matchInfo, 
          },
        }));
        break;
      }
      case 'current-game': {
        const matchInfo = this.getMatchStats();
        this.observer.commitState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            info: matchInfo,
            currentGame: this.currentGame.id,
          },
        }));
        break;
      };
      case 'controller': {
        this.observer.commitState(prevState => ({
          ...prevState,
          controller: {
            newGame: this.startNewGame
          },
        }));
        break;
      };
      default: {
        const matchInfo = this.getMatchStats();
        this.observer.commitState(prevState => ({
          data: {
            ...prevState?.data ?? [],
            info: matchInfo,
          },
          controller: {
            newGame: this.startNewGame
          },
        }));
        break;
      };
    };
  };
};

export default Match;
