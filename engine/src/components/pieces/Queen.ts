// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

class Queen extends Piece {

  constructor(side: Side) {
    super(PieceKind.Queen, side);
  };
};

export default Queen;
