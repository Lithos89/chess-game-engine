// Types, interfaces, constants, ...
import { PieceKind, type Side } from '../../logic/Terms';

// Components
import Piece from './Piece';

class Bishop extends Piece {

  constructor(side: Side) {
    super(PieceKind.Bishop, side);
  };
};

export default Bishop;
