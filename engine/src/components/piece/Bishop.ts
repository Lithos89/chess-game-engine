
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Bishop extends Piece {

  constructor(side: Side) {
    super(PieceKind.Bishop, side);
  };

  updateLegalLines = () => {
    this.legalLines = super.getLegalLines(Search.diagonals(undefined));
  };
};

export default Bishop;
