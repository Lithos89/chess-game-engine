// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Knight extends Piece {

  constructor(side: Side) {
    super(PieceKind.Knight, side);
  };

  updateLegalLines = () => {
    this.legalLines = super.getLegalLines(Search.Ls);
  };
};

export default Knight;
