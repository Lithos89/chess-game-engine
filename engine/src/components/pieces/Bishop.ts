// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import { search } from '../../logic/algorithms/movement';

class Bishop extends Piece {

  constructor(side: Side) {
    super(PieceKind.Bishop, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(search.diagonals);
  }
};

export default Bishop;
