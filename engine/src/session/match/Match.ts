
// Types, interfaces, constants, ...
import { BoardSquareCondensed } from 'formation/structure/board';
import BoardObserver from 'session/board/BoardObserver';
import { type Side, SIDES } from '../../logic/Terms';

// Classes
import { Game } from '../game/Game';
import MatchObserver from './MatchObserver';

// *: Class that captures a series of games between an opponent
export default class Match {
  private games: Game[] = [];
  public currentGame: Game;
  private selectedGameIndex: number = 0;
  protected currentSide: Side;

  private readonly gameGenerator: Generator<Game, Game, Game>;

  private observer: MatchObserver;

  gameStateCallback: (state) => void = () => {};
  
  private gameCount: number = 0

  // *: In the case of a tie, add 0.5 to each side
  readonly wins: { player: number, opponent: number } = {
    player: 0,
    opponent: 0
  };

  constructor(side: Side) {
    this.gameGenerator = this.generateNextGame(side, 'test')
  };

  storeGame(game: Game) {
    this.games.push(game);

    // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
    this.currentGame = game;
    this.currentSide = game.playerSide;
    this.gameCount += 1;

    console.log(this.currentGame.id);
  }

  setGameStateCallback = (callback) => {
    this.gameStateCallback = callback
  };

  callGameStateCallback = (contents) => {
    this.gameStateCallback(contents);
  }

  // TODO: Review the generator when it finished because I suspect that it doesn't behave correctly
  // TODO: Fix the type annotation for the generator
  * generateNextGame(startingSide: Side, id: string, matchLength: number = 100): Generator<Game, Game, Game> {
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

    return
  };

  setObserver = (updateMatchStateCallback) => {
    this.observer = new MatchObserver(this, updateMatchStateCallback);
    this.observer?.update();
  };

  startNewGame = () => {
    const newGame = this.gameGenerator.next().value;

    // TODO: Set this is as the type of GameController which I will create or do something along these lines
    const {
      requestMove: move,
      selectPiece: select,
      undo
    } = newGame.moveController;

    this.observer?.update();
    
    return { move, select, undo };
  };

  getGame(index: number) {
    return this.games[index];
  };

  getMatchStats = () => {
    return({
      wins: this.wins,
      currentSide: this.currentSide,
      games: this.games.length,
    });
  };

  // !: Will need to change this to act like resigning
  resignGame = () => {
    // *: Give the victory to the opponent
    const _opponentSide = SIDES[1 - SIDES.indexOf(this.currentSide)];
    this.updateWins(_opponentSide);

    const newGame = this.startNewGame();
    return newGame;
  };

  updateWins(result: Side | 'draw') {
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

  // setObserver = (updateMatchStateCallback) => {
  //   this.observer = new MatchObserver(this, updateMatchStateCallback);
  // };
};