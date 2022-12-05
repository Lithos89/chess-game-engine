// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import { search } from '../../logic/algorithms/movement';

class Knight extends Piece {

  constructor(side: Side) {
    super(PieceKind.Knight, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(search.Ls);
  }
};

export default Knight;
