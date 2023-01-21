
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Bishop extends Piece {
  public kind = PieceKind.Bishop;

  public movementAlgorithms = [Search.diagonals()];
};

export default Bishop;
