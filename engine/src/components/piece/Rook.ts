
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';

class Rook extends Piece {
  constructor(side: Side) {
    super(PieceKind.Rook, side);
  };

  updateAvailableMoves = () => {
    this.availableMoves = super.getAvailablePositions(Search.file(true), Search.rank);
  };
};

export default Rook;
