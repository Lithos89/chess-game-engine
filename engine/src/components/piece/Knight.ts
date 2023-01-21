
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Knight extends Piece {
  public kind = PieceKind.Knight;
  public movementAlgorithms = [Search.Ls()];
};

export default Knight;
