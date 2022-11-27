import { Game } from './Game';

const gameModel = new Game();

console.log(Object.keys(gameModel.squares).length);

for (const key in gameModel.squares) {
  console.log(gameModel.squares[key])
}