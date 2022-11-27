import { PieceKind, type Side } from '../Terms.js';

import Piece from './Piece.js';

class King extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.King);
    this.side = side;
  };
};

export default King;
