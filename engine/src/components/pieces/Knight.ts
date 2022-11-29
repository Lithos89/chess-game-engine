import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class Knight extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Knight);
    this.side = side;
  };
};

export default Knight;
