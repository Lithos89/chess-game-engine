// Logic
import { type Side } from '../logic/Terms';

// Classes
import { Game } from './game/Game';

// *: Class that captures a series of games between an opponent
export default class Match {
  games: Game[] = [];

  selectedGameIndex: number = 0;
  currentGame: Game;
  currentSide: Side;

  // !: Need to add static type checking to this line
  gameGenerator;
  // Add here a property that takes the squares from the current games move cntroller
  private gameCount: number = 0

  // *: In the case of a tie, add 0.5 to each side
  readonly wins: {[user: string]: number} = {
    player: 0,
    computer: 0
  };

  constructor(side: Side) {
    this.gameGenerator = this.generateNextGame(side, 'test')
    // !: Fix this type conversion to something better
    const newGame = this.gameGenerator.next().value as Game
    this.games.push(newGame);

    this.currentGame = newGame;
    this.currentSide = side;
    this.gameCount += 1;
  }

  storeGame(game: Game) {
    this.games.push(game)
    this.gameCount += 1
  }

  * generateNextGame(startingSide: Side, id: string) {
    // ?: Add in here the logic that will keep switching the sides of 
    // ?: the game for the match based on the previous game

    var tempID = 0

    while (true) {
      const newGame = new Game(startingSide, tempID.toString())
      this.storeGame(newGame)
      yield new Game(startingSide, tempID.toString());
      tempID += 1
    }
  }

  


  resetGame = () => {
    this.currentGame = this.gameGenerator.next().value;
    // console.log('new')
    console.log(this.currentGame.id);
    // this.currentGame = new Game('white')
    return this.currentGame.boardController.boardSquares;
  }

  updateWins(result: Side | 'draw') {

    // !: Need to update this to look at the side of the player and the computer and update the appropriate win section
    switch (result) {
      case('white'):
        this.wins.white++
        break;
      case('black'):
        this.wins.black++
        break;
      case('draw'):
        this.wins.white += 0.5
        this.wins.black += 0.5
    }
  }

  // ?: See in the future I want to implement a resign function but for now will stick only with restart, thereby allowing
  // ?: the user to restart the current game without losing
  /* resign() {
    
  } */
};