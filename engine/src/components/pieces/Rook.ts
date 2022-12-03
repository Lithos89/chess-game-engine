import { ShortPosition } from 'logic/Terms';
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

class Rook extends Piece {
  constructor(side: Side) {
    super(PieceKind.Rook, side);
  };

  getAvailablePositions(): ShortPosition[] {
    
  }

};

export default Rook;
