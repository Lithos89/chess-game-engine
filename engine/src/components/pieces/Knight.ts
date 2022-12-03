// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

class Knight extends Piece {

  constructor(side: Side) {
    super(PieceKind.Knight, side);
  };
};

export default Knight;
