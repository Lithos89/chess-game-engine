import { PieceKind, type Side } from '../Terms.js';

import Piece from './Piece.js';

class Rook extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Rook);
    this.side = side;
  };
};

export default Rook;
