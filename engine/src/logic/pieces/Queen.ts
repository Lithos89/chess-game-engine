import { PieceKind, type Side } from '../Terms.js';

import Piece from './Piece.js';

class Queen extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Queen);
    this.side = side;
  };
};

export default Queen;
