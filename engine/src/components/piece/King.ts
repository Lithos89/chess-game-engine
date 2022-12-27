// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';
import Movable from 'session/move/interfaces/movable';

class King extends Piece implements Movable {
  moved: boolean = false;

  constructor(side: Side) {
    super(PieceKind.King, side);
  };

  updateLegalLines = () => {
    this.legalLines = super.getLegalLines(Search.file(1), Search.diagonals(1), Search.rank(1));
  };
};

export default King;
