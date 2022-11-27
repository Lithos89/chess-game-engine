import { PieceKind, type Side } from '../Terms.js';

import Piece from './Piece.js';

class Knight extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Knight);
    this.side = side;
  };
};

export default Knight;
