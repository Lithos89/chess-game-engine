import { PieceKind, type Side } from '../../Terms';
import Piece from './Piece';

class Pawn extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Pawn);
    this.side = side;
  };
};

export default Pawn;
