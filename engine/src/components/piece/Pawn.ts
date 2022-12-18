// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';

class Pawn extends Piece {
  constructor(side: Side) {
    super(PieceKind.Pawn, side);
  };

  updateAvailableMoves = () => {
   this.availableMoves = super.getAvailablePositions(Search.file(false)) ;
  };
};

export default Pawn;
