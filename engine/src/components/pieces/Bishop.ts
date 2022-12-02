import { PieceKind, type Side } from '../../logic/Terms';

import Square from 'components/Square';
import Piece from './Piece';

class Bishop extends Piece {
  side: Side;

  constructor(side: Side) {
    super(PieceKind.Bishop);
    this.side = side;
  };

  move(currentSquare: Square, destSquare: Square): { [shortPosition: string] : Square } {
    return Piece.movePiece(currentSquare, destSquare);
  };
};

export default Bishop;
