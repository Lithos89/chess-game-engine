// Logic
import { BoardSquareCondensed } from 'formation/structure/board';
import BoardController from '../board/BoardController';
import { type Side, SIDES } from '../../logic/Terms';

// Classes
import { Game } from '../game/Game';

// *: Class that captures a series of games between an opponent
export default class Match {
  private games: Game[] = [];

  selectedGameIndex: number = 0;
  currentGame: Game;
  currentSide: Side;

  gameGenerator: Generator<Game, Game, Game>;
  // Add here a property that takes the squares from the current games move cntroller
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
    this.currentGame = game;
    this.currentSide = game.playerSide;
    this.gameCount += 1;
    console.log(this.currentGame.id);
  }

  // TODO: Review the generator when it finished because I suspect that it doesn't behave correctly
  * generateNextGame(startingSide: Side, id: string, matchLength: number = 100): Generator<Game, Game, Game> {

    let side: Side = startingSide;

    while (this.games.length < matchLength) {
      const gameID = `${id}_${side}_${this.gameCount}`;
      const newGame = new Game(side, gameID);
      yield newGame;
      this.storeGame(newGame);
      const _nextSideIndex = (SIDES.length - 1) - SIDES.indexOf(side);
      side = SIDES[_nextSideIndex];
    };
    return
  };

  startNewGame = (updateBoardStateCallback: (boardState: BoardSquareCondensed[]) => void) => {
    const newGame = this.gameGenerator.next().value;
    const boardController = new BoardController(newGame, updateBoardStateCallback);
    const moveController = boardController.moveManager.controller;

    // TODO: Set this is as the type of GameController which I will create or do something along these lines
    const {
      requestMove: move,
      selectPiece: select,
      undo
    } = moveController;
    
    return { move, select, undo };
  };

  getGame(index: number) {
    return this.games[index];
  };

  getMatchStats = () => {
    return({
      wins: this.wins,
      currentSide: this.currentSide
    })
  }

  // !: Will need to change this to act like resigning
  resignGame = () => {
    // *: Give the victory to the opponent
    const _opponentSide = SIDES[1 - SIDES.indexOf(this.currentSide)]
    this.updateWins(_opponentSide)
    // this.currentGame = new Game('white')
    // return this.currentGame.boardController.boardSquares;
  };

  updateWins(result: Side | 'draw') {

    if (result === 'draw') {
      this.wins.player += 0.5
      this.wins.opponent += 0.5
    } else {
      const playerWon = result === this.currentSide
      if (playerWon) {
        this.wins.player += 1
      } else {
        this.wins.opponent += 1
      }
    }
  }
  // ?: See in the future I want to implement a resign function but for now will stick only with restart, thereby allowing
  // ?: the user to restart the current game without losing
  /* resign() {
    
  } */
};