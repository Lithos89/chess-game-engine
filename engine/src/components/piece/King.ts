
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { type Side, type ShortPosition, PieceKind, SIDES } from '../../logic/terms';
import { type MoveLine } from '../../logic/algorithms/types';

// Components
import Piece from './Piece';
import Square from '../Square';

// Algorithms
import Search from '../../logic/algorithms/core';
import DynamicBehavior from './interfaces/dynamicBehavior';

// Utils
import convertPosition from '../../utils/position/convertPosition';

interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine
};

class King extends Piece implements DynamicBehavior {
  public movementAlgorithms: null;
  public moved: boolean = false;

  //? See how this static implementation works when it comes to multiple games or sessions
  // TODO: Add error handling to make sure that both properties are filled and that they do not become overwritten
  public enemyKing: King;

  public checks: Attack[] = [];

  constructor(side: Side) {
    super(PieceKind.King, side);
    King[side] = this;
  };

  loadMoveAlgorithms = () => [Search.file(1), Search.diagonals(1), Search.rank(1)];

  // public override influenceEmptySquare = (controlledSquares, enemyKing) => (linePos: ShortPosition) => {
  //   const enemySide = enemyKing.side;
  //   if (!controlledSquares[enemySide].has(linePos)) {
  //     if (!enemyKing.legalLines.flat(2).includes(linePos)) {
  //       return true;
  //     };
  //   };
  //   return false;
  // };

  public override influenceEmptySquare = (square: Square): boolean => {
    const enemySide = this.enemyKing.side;

    console.log(this.legalLines);

    if (!square.controlled[enemySide]) {
      const enemyKingControlledSquares: ShortPosition[] = this.enemyKing.legalLines.flat(2);
      const squareShortPos: ShortPosition = convertPosition(square.position) as ShortPosition;

      console.log(enemyKingControlledSquares)
      console.log(squareShortPos)
      if (!enemyKingControlledSquares.includes(squareShortPos)) {
        return true;
      };
    };
    return false;
  };

  public override influenceOccupiedSquare = (square: Square): boolean => {
    const destPiece: Piece = square.piece;
    const simpleCaptureAvailable: boolean = !isNull(destPiece) && destPiece.side !== this.side;

    if (simpleCaptureAvailable) {
      if (!destPiece?.isProtected) {
        return true;
      };
    } else {
      destPiece.isProtected = true;
    };

    return false;
  };


};

export default King;
