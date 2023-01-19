
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { type Side, type ShortPosition, type BoardDirection, PieceKind } from '../../logic/terms';
import { Attack } from '../../logic/concepts';

// Components
import Piece from './Piece';
import Square from '../Square';

// Algorithms
import Search from '../../logic/algorithms/core';
import DynamicBehavior from './interfaces/dynamicBehavior';

// Utils
import convertPosition from '../../utils/regulation/position/convertPosition';
import calcDistance from '../../utils/regulation/position/calcDistance';
import getBoardDirection from '../../utils/regulation/direction/getBoardDirection';

class King extends Piece implements DynamicBehavior {
  public movementAlgorithms: null;
  public moved: boolean = false;

  public enemyKing: King;

  public checks: Attack[] = [];

  public castleAvailableCallback: (direction: BoardDirection) => boolean;

  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  public loadMoveAlgorithms() {
    const rankMoveAlgorithm = this.moved ? Search.rank(1) : Search.rank(2);
    return [Search.file(1), Search.diagonals(1), rankMoveAlgorithm];
  };

  public override influenceEmptySquare = (square: Square): boolean => {
    const enemySide = this.enemyKing.side;

    if (!square.controlled[enemySide]) {
      const enemyKingControlledSquares: ShortPosition[] = this.enemyKing.legalLines.flat(2);
      const squareShortPos: ShortPosition = convertPosition(square.position) as ShortPosition;

      if (!enemyKingControlledSquares.includes(squareShortPos)) {
        if (calcDistance(this.position, square.position) > 1) {
          const castlingDirection: BoardDirection = getBoardDirection(this.position, square.position, 'horizontal');
          const canCastleToSquare = this.castleAvailableCallback(castlingDirection);

          if (canCastleToSquare)
            return true;
          else
            return false;
        } else {
          square.controlled[this.side] = true;
          return true;
        }
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
