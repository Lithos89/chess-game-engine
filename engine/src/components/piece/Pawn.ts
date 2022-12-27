// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
// import Search from '../../logic/algorithms/movement';
import Search from '../../logic/algorithms/core';
import Movable from 'session/move/interfaces/movable';

class Pawn extends Piece implements Movable {
  moved: boolean = false;

  constructor(side: Side) {
    super(PieceKind.Pawn, side);
  };

  updateLegalLines = () => {
    const direction = this.side === 'white' ? '+' : '-';
    const fileDistance = this.moved ? 1 : 2;

    this.legalLines = super.getLegalLines(
      Search.file(fileDistance, direction),
      // Search.diagonals(1, direction)
    );
  };
};

export default Pawn;
