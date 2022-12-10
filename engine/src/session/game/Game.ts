import { SIDES } from '../../logic/Terms';
import { PieceKind, type Side } from '../../logic/Terms';
import defaultStartingFormation from '../../formation/setups/start';

export class Game {
  readonly id: string;

  readonly playerSide: Side;
  private currentTurnSide: Side = 'white';
  startingFormation = defaultStartingFormation;

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
    },
  };

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;
  };

  takeTurn = () => {
    this.currentTurnSide = SIDES[1 - SIDES.indexOf(this.currentTurnSide)];
  };
};