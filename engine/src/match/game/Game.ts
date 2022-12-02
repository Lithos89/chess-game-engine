import { boardPositions, PieceKind, ShortPosition, type Side } from '../../logic/Terms';
import startingFormation from '../../formation/setups/start';

import BoardController from '../board/BoardController';

export class Game {
  id: string;
  // !: Make boardController private and come up with a mechanism o provide an outlet to the square dictionary and make that public
  boardController: BoardController;
  playerSide: Side

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

  getGameSquares() {
    return this.boardController.boardSquares
  }

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;
    // !: Still have to do something with this side prop
    this.boardController = new BoardController(startingFormation);
  };
};