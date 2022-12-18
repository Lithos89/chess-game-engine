
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';

class Queen extends Piece {
  constructor(side: Side) {
    super(PieceKind.Queen, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.diagonals, Search.file(true), Search.rank);
  };
};

export default Queen;
