
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Queen extends Piece {
  public movementAlgorithms = [Search.diagonals(), Search.file(), Search.rank()];

  constructor(side: Side) {
    super(PieceKind.Queen, side);
  };
};

export default Queen;
