// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class King extends Piece {
  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.file(1), Search.diagonals(1), Search.rank(1));
  };
};

export default King;
