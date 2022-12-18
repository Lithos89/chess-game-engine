// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';

class Knight extends Piece {

  constructor(side: Side) {
    super(PieceKind.Knight, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.Ls);
  };
};

export default Knight;
