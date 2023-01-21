
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
import getEnemySide from '../../utils/regulation/side/getEnemySide';

class King extends Piece implements DynamicBehavior {
  public kind = PieceKind.King

  public movementAlgorithms = null;
  public moved: boolean = false;

  public enemyKing: King;
  public checks: Attack[] = [];

  private isCastleAvailable: (direction: BoardDirection) => boolean;

  
  public loadMoveAlgorithms() {
    const rankMoveDistance = this.moved ? 1 : 2;
    
    return [Search.file(1), Search.diagonals(1), Search.rank(rankMoveDistance)];
  };

  public override influenceEmptySquare = (square: Square): boolean => {
    const squarePos: ShortPosition = convertPosition(square.position) as ShortPosition;

    const enemySide = getEnemySide(this.side);
    const enemyKingControlledSquares: ShortPosition[] = this.enemyKing.legalLines.flat(2);

    //?: enemyKingControlledSquares used because kings are update one after the other, causing bugs if not used (could fix)
    const squareControlledByEnemy = square.controlled[enemySide] || enemyKingControlledSquares.includes(squarePos);
    
    if (!squareControlledByEnemy) {
      const castlingMove = calcDistance(this.position, square.position) > 1;
      
      if (castlingMove) {
        const castlingDirection: BoardDirection = getBoardDirection(this.position, square.position, 'horizontal');
        return this.isCastleAvailable(castlingDirection);
      } else {
        square.controlled[this.side] = true;
        return true;
      };
    } else {
      return false;
    };
  };

  public override influenceOccupiedSquare = (square: Square): boolean => {
    const destPiece: Piece | null = square.piece;
    const simpleCaptureAvailable: boolean = destPiece?.side === getEnemySide(this.side);

    if (simpleCaptureAvailable) {
      if (!destPiece?.isProtected) {
        return true;
      };
    } else {
      destPiece.isProtected = true;
    };

    return false;
  };

  /*----------------------------------CASTLING------------------------------*/

  public setCastleAvailableCallback(callback: (direction: BoardDirection) => boolean) {
    this.isCastleAvailable = callback;
  };
};

export default King;
