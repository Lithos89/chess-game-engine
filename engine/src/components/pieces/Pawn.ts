// Types, interfaces, constants, ...
import { PieceKind, type Side, type Position, type ShortPosition } from '../../logic/Terms';

// Components
import Piece from './Piece';

class Pawn extends Piece {

  constructor(side: Side) {
    super(PieceKind.Pawn, side);
  };

  getAvailablePositions(): ShortPosition[] {
    
  }
};

export default Pawn;
