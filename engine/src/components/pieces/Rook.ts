import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class Rook extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Rook);
    this.side = side;
  };
};

export default Rook;
