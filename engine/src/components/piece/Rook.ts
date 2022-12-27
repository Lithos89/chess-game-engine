
// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';
import Movable from 'session/move/interfaces/movable';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';

class Rook extends Piece implements Movable {
  moved: boolean = false;
  constructor(side: Side) {
    super(PieceKind.Rook, side);
  };

  updateLegalLines = () => {
    this.legalLines = super.getLegalLines(Search.file(undefined), Search.rank(undefined));
  };
};

export default Rook;
