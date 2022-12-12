import { SIDES } from '../../logic/Terms';
import { PieceKind, type Side } from '../../logic/Terms';
import defaultStartingFormation from '../../formation/setups/start';
import MoveController from '../move/MoveController';
import BoardManager from '../board/BoardManager';
import BoardObserver from '../board/BoardObserver';

export class Game {
  readonly id: string;

  readonly playerSide: Side;
  private currentTurnSide: Side = 'white';
  startingFormation = defaultStartingFormation;

  boardManager: BoardManager;
  boardObserver: BoardObserver;
  moveController: MoveController;

  // *: Dictionary that holds the squares that makeup the board
  captures: {[_side in Side]: {[_piece in PieceKind] : number}} = {
    white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
    black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
  };

  constructor(side: Side, id: string, callback) {
    this.id = id;
    this.playerSide = side;

    const boardManager = new BoardManager(this, callback);
    const boardObserver = new BoardObserver(boardManager, callback);
    this.boardManager = boardManager;
    this.boardObserver = boardObserver;
    this.moveController = boardManager.moveManager.controller;
  };

  takeTurn = () => {
    this.currentTurnSide = SIDES[1 - SIDES.indexOf(this.currentTurnSide)];
  };
};