
// Types, interfaces, constants, ...
import { type Side, SIDES } from '../../logic/Terms';

// Classes
import { Game } from '../game/Game';
import MatchObserver from './MatchObserver';

// *: Class that captures a series of games between an opponent
export default class Match {
  private games: Game[] = [];
  private gameCount: number = 0;

  public currentGame: Game;
  private selectedGameIndex: number = 0;

  protected currentSide: Side;

  private readonly gameGenerator: Generator<Game, Game, Game>;

  private observer: MatchObserver;

  private gameStateCallback: (state) => void = () => {}; // !: See if I can get rid of this

  // *: In the case of a tie, add 0.5 to each side
  private readonly wins: { player: number, opponent: number } = {
    player: 0,
    opponent: 0,
  };

  constructor(side: Side) {
    this.gameGenerator = this.generateNextGame(side, 'test');
  };


  /*--------------------------------------------GAME MANAGEMENT---------------------------------------------*/

  public startNewGame = () => {
    this.gameGenerator.next();
    this.observer?.update();
  };

  // TODO: Will need to change this to act like resigning (freezing the current game)
  public resignGame = () => {
    // *: Give the victory to the opponent
    const _opponentSide = SIDES[1 - SIDES.indexOf(this.currentSide)];
    this.updateWins(_opponentSide);

    // ?: For now, resigning starts the next game.
    this.startNewGame();
  };

  // TODO: Review the generator when it finished because I suspect that it doesn't behave correctly
  private * generateNextGame(startingSide: Side, id: string, matchLength: number = 100): Generator<Game, Game, Game> {
    let side: Side = startingSide;

    while (this.games.length < matchLength) {
      const gameID = `${id}_${side}_${this.gameCount}`;
      const newGame = new Game(side, gameID, this.callGameStateCallback);
      yield newGame;
      this.storeGame(newGame);
      console.info(this.currentGame);
      const _nextSideIndex = (SIDES.length - 1) - SIDES.indexOf(side);
      side = SIDES[_nextSideIndex];
    };

    return;
  };

  private storeGame(game: Game) {
    this.games.push(game);

    // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
    this.currentGame = game;
    this.currentSide = game.playerSide;
    this.gameCount += 1;

    console.log(this.currentGame.id);
  };


  /*----------------------------------------CLIENT STATE MANAGEMENT------------------------------------------*/

  setObserver = (updateMatchStateCallback: (state: any) => void) => {
    this.observer = new MatchObserver(this, updateMatchStateCallback);
    this.observer?.update(); // ?: See if I need to include the ?
  };

  setGameStateCallback = (callback) => {
    this.gameStateCallback = callback;
  };

  callGameStateCallback = (contents) => {
    this.gameStateCallback(contents);
  };


  /*-----------------------------------------------MATCH INFO----------------------------------------------------*/

  // TODO: Have to fix the class access for this function
  getMatchStats = (): { wins: { player: number, opponent: number }, currentSide: Side, games: number } => ({
    wins: this.wins,
    currentSide: this.currentSide,
    games: this.games.length,
  });

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

    this.observer?.update();
  };
};