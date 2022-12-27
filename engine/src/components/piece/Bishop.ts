
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

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.diagonals(undefined));
  };
};

export default Bishop;
