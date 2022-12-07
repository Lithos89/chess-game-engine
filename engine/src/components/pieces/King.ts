// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import { search } from '../../logic/algorithms/movement';

class King extends Piece {
  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(search.file(true), search.diagonals, search.rank);
  };
};

export default King;
