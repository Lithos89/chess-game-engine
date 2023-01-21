// Types, interfaces, constants, ...
import { type Side, SIDES } from '../../logic/terms';

// Game Management
import Game from '../game/Game';
import GameController from '../game/GameController';

// State Management
import Observer from '../../state/Observer';
import Observable from '../../state/observable';
import getEnemySide from '../../utils/regulation/side/getEnemySide';

// *: Class that captures a series of games between an opponent
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

  constructor(id: string, side: Side) {
    this.id = id
    this.gameGenerator = this.generateNextGame(side, id);
    this.observer = new Observer(this);
  };


  /*--------------------------------------------GAME MANAGEMENT---------------------------------------------*/

  public startNewGame = () => {
    this.gameGenerator.next();
    // this.signalState();
  };

  // TODO: Will need to change this to act like resigning (freezing the current game)
  public resignGame = () => {
    // *: Give the victory to the opponent
    this.updateWins(getEnemySide(this.currentSide));

    // ?: For now, resigning starts the next game.
    this.startNewGame();
  };

  private * generateNextGame(startingSide: Side, id: string, matchLength: number = 100): Generator<unknown, void, Game> {
    let side: Side = startingSide;

    while (this.games.length < matchLength) {
      const gameID = `${id}_${side}_${this.gameCount}`;
      const newGame = new GameController(gameID, side);
      this.storeGame(newGame);
      yield newGame;
      side = getEnemySide(side);
    };

    return;
  };

  private storeGame(game: Game) {
    // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
    this.currentGame = game;
    this.games.push(game);

    this.currentSide = game.playerSide;
    this.gameCount += 1;

    this.signalState('current-game');
  };

  
  /*-----------------------------------------------MATCH INFO----------------------------------------------------*/

  private getMatchStats = (): { wins: { player: number, opponent: number }, currentSide: Side | null, games: number } => ({
    wins: this.wins,
    currentSide: this.currentSide,
    games: this.games.length,
  });

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
      }
      case 'controller': {
        this.observer.commitState(prevState => ({
          ...prevState,
          controller: {
            newGame: this.startNewGame,
            resign: this.resignGame,
          },
        }));
        break;
      }
      default: {
        const matchInfo = this.getMatchStats();
        this.observer.commitState(prevState => ({
          data: {
            ...prevState?.data ?? [],
            info: matchInfo,
          },
          controller: {
            newGame: this.startNewGame,
            resign: this.resignGame,
          },
        }));
        break;
      }
    };
  };

  private updateWins(result: Side | 'draw') {
    if (result === 'draw') {
      this.wins.player += 0.5;
      this.wins.opponent += 0.5;
    } else {
      const playerWon = result === this.currentSide;
      
      if (playerWon) {
        this.wins.player += 1;
      } else {
        this.wins.opponent += 1;
      };
    };

    this.signalState('info');
  };
};

export default Match;
