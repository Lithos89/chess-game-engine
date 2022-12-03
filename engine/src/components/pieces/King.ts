// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

class King extends Piece {

  constructor(side: Side) {
    super(PieceKind.King, side);
  };
};

export default King;
