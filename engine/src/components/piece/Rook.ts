
import { isEmpty } from 'lodash';

// Types, interfaces, constants, ...
import { PieceKind, type Side, type ShortPosition } from '../../logic/terms';
import { type MoveLine } from '../../logic/concepts';
// Class interfaces
import DynamicBehavior from './interfaces/dynamicBehavior';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Rook extends Piece implements DynamicBehavior {
  public movementAlgorithms: null;
  public moved: boolean = false;
  
  constructor(side: Side) {
    super(PieceKind.Rook, side);
  };

  loadMoveAlgorithms = () => [Search.file(), Search.rank()];

  // emptySquareCallback = (linePos: ShortPosition) => true;

  // occupiedSquareCallback = (linePos: ShortPosition, playableLine: MoveLine, destPiece: Piece) => {
  //   // const destPiece: Piece | null = board[linePos].piece;
  //   const altCapturing = !isEmpty(this.captureAlgorithms); // If a piece can still move there without capturing
  //   const simpleCaptureAvailable: boolean = destPiece?.side !== this.side && !altCapturing;

  //   if (simpleCaptureAvailable) {
  //     if (destPiece?.kind === PieceKind.King) {
  //       checks.push({ attackPiece: this, frontAttackLine: playableLine });
  //     } else {
  //       return true;
  //     };
  //   }
  //   return false; 
  // };
};

export default Rook;
