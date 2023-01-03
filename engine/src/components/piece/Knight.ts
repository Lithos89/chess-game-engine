// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Knight extends Piece {
  public movementAlgorithms = [Search.Ls()];

  constructor(side: Side) {
    super(PieceKind.Knight, side);
  };
};

export default Knight;
