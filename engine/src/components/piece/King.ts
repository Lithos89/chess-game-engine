// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';

class King extends Piece {
  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.file(true), Search.diagonals, Search.rank);
  };
};

export default King;
