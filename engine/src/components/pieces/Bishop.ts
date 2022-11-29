import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class Bishop extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Bishop);
    this.side = side;
  };
};

export default Bishop;
