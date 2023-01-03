// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';
import DynamicBehavior from './interfaces/dynamicBehavior';

class King extends Piece implements DynamicBehavior {
  public movementAlgorithms: null;
  public moved: boolean = false;

  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  loadMoveAlgorithms = () => {

    return [
      Search.file(1),
      Search.diagonals(1),
      Search.rank(1)
    ];
  }
};

export default King;
