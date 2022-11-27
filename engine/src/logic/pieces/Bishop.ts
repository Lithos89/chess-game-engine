import { PieceKind, type Side } from '../Terms.js';

import Piece from './Piece.js';

class Bishop extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Bishop);
    this.side = side;
  };
};

export default Bishop;
