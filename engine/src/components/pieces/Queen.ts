
// Types, interfaces, constants, ...
import { PieceKind, type Side } from 'logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import { search } from 'logic/algorithms/movement';

class Queen extends Piece {

  constructor(side: Side) {
    super(PieceKind.Queen, side);
    this.availableMoves = super.getAvailablePositions(search.diagonals, search.file(true), search.rank);
  };
};

export default Queen;
