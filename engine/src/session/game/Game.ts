
import { isEqual, isString } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition, type Side, SIDES } from '../../logic/Terms';
import defaultStartingFormation from '../../formation/setups/start';

// Components
import Square from '../../components/Square';
import Piece from '../../components/pieces';

// Game Management
import BoardManager from '../board/BoardManager';
import MoveManager from '../move/MoveManager';

// Utils
import { flipFormation } from '../../utils';


const flipped = flipFormation(defaultStartingFormation);


class Game {
  readonly id: string;

  readonly playerSide: Side;
  private currentTurnSide: Side = 'white';
  private turnCount: number = 0;

  private boardManager: BoardManager;
  private moveManager: MoveManager;

  constructor(side: Side, id: string) {
    this.id = id;
    this.playerSide = side;

    const startingFormation = isEqual(side, 'white') ? 
      defaultStartingFormation :
      flipped;

    console.info(startingFormation);

    this.boardManager = new BoardManager(startingFormation, () => this.currentTurnSide);

    // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
    this.moveManager = new MoveManager(this.boardManager); // ?: See if I can get rid of the boardManager parameter
  };

  private takeTurn() {
    this.currentTurnSide = SIDES[1 - SIDES.indexOf(this.currentTurnSide)];
    this.turnCount += 1;
  };

  //* Returns whether the highlight was performed successfully
  protected attemptHighlight = (position?: ShortPosition): boolean => {
    if (isString(position)) {
      const selectedPiece = this.boardManager.boardSquares[position]?.piece;

      if (
        (selectedPiece instanceof Piece) &&
        isEqual(selectedPiece.side, this.currentTurnSide)
      ) {
        this.boardManager.highlightAvailableMoves(selectedPiece);
        return true;
      } else {
        return false;
      };
    } else {
      this.boardManager.highlightAvailableMoves();
      return true;
    };
  };

  protected attemptMove = (from: ShortPosition, to: ShortPosition): boolean => {
    const originSquare: Square = this.boardManager.boardSquares[from];
    const destSquare: Square = this.boardManager.boardSquares[to];

    //* Move Validity checks
    const isLegal = originSquare?.piece?.availableMoves.includes(to);
    const isValidSide = isEqual(originSquare?.piece.side, this.currentTurnSide);

    if (isLegal && isValidSide) {
      this.moveManager.commitMove(originSquare, destSquare);
      this.takeTurn();
      return true;
    } else {
      return false;
    };
  };

  // TODO: Add more checks and functionality here
  protected undo = () => {
    this.moveManager.takebackMove();
  };
};

export default Game;
