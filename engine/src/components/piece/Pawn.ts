// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/movement';
import {tempDiagGen, searchFile} from '../../logic/algorithms/control';

class Pawn extends Piece {
  moved: boolean = false;

  constructor(side: Side) {
    super(PieceKind.Pawn, side);
  };

  updateAvailableMoves = () => {
    const direction = this.side === 'white' ? '+' : '-';
    const fileDistance = this.moved ? 1 : 2;

    this.availableMoves = super.getAvailablePositions(searchFile(fileDistance, direction), tempDiagGen(1, direction)) ;
  };
};

export default Pawn;
