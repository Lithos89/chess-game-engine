
// Types, interfaces, constants, ...
import { PieceKind, type Side } from 'logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import { search } from 'logic/algorithms/movement';

class Rook extends Piece {
  constructor(side: Side) {
    super(PieceKind.Rook, side);
    super.getAvailablePositions(search.file(true), search.rank);
  };
};

export default Rook;
