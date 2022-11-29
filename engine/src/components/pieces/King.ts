import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class King extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.King);
    this.side = side;
  };
};

export default King;
