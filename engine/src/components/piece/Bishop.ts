
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Bishop extends Piece {
  public movementAlgorithms = [Search.diagonals()];

  constructor(side: Side) {
    super(PieceKind.Bishop, side);
  };
};

export default Bishop;
