import { boardPositions, PieceKind, ShortPosition, type Side } from '../../logic/Terms';
import startingFormation from '../../formation/setups/start';

import BoardController from '../board/BoardController';

export class Game {
  readonly id: string;
  // !: Make boardController private and come up with a mechanism o provide an outlet to the square dictionary and make that public
  boardController: BoardController;
  readonly playerSide: Side

  // *: Dictionary that holds the squares that makeup the board
  captures: {[_side in Side]: {[_piece in PieceKind] : number}} = {
    white: {
      p: 0,
      r: 0,
      h: 0,
      b: 0,
      q: 0,
      k: 0,
    },
    black: {
      p: 0,
      r: 0,
      h: 0,
      b: 0,
      q: 0,
      k: 0,
    }
  };

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;
    // !: Still have to use this side to manipulate the board depending on the side
    this.boardController = new BoardController(startingFormation);
  };

  getGameSquares() {
    return this.boardController.boardSquares
  }
};