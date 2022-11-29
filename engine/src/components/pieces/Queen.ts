import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class Queen extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Queen);
    this.side = side;
  };
};

export default Queen;
