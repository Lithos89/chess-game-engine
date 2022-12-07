// Types, interfaces, constants, ...
import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';
// import Movable from '../../match/move/interfaces/Movable';

// Components
// import Square from '../Square';

abstract class Piece {
  readonly side: Side;
  readonly kind: PieceKind;
  position: Position;
  availableMoves: ShortPosition[];

  abstract updateAvailableMoves(): void;

  constructor(piece: PieceKind, side: Side) { 
    this.kind = piece;
    this.side = side;
  };

  getAvailablePositions(...searchAlgorithms: ((_position: Position) => ShortPosition[])[]): ShortPosition[] {
    const availableMoves: ShortPosition[] = [];

    for (const algo of searchAlgorithms) {
      availableMoves.push(...algo(this.position));
    };

    return availableMoves;
  };
};

export default Piece;
