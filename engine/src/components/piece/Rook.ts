
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Rook extends Piece {
  constructor(side: Side) {
    super(PieceKind.Rook, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.file(undefined), Search.rank(undefined));
  };
};

export default Rook;
