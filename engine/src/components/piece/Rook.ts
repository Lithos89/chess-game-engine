
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';
// Class interfaces
import DynamicBehavior from './interfaces/dynamicBehavior';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Rook extends Piece implements DynamicBehavior {
  public kind = PieceKind.Rook;

  public movementAlgorithms: null;
  public moved: boolean = false;

  loadMoveAlgorithms = () => [Search.file(), Search.rank()];
};

export default Rook;
