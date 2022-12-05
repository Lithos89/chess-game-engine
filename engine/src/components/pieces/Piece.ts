// Types, interfaces, constants, ...
import { type Side, PieceKind, type ShortPosition, type Position } from 'logic/Terms';
import Movable from 'match/move/interfaces/Movable';

// Components
import Square from '../Square';

abstract class Piece implements Movable {
  side: Side;
  kind: PieceKind;
  position: Position;
  availableMoves: ShortPosition[];
  static movePiece: (arg0: Square, arg1: Square) => { [shortPosition: string] : Square };

  constructor(piece: PieceKind, side: Side) { 
    this.kind = piece;
    this.side = side;
  }

  getAvailablePositions(...searchAlgorithms: ((_position: Position) => ShortPosition[])[]): ShortPosition[] {
    const availableMoves: ShortPosition[] = []

    for (const algo of searchAlgorithms) {
      availableMoves.push(...algo(this.position));
    };

    return availableMoves
  };

  move(currentSquare: Square, destSquare: Square): { [shortPosition: string] : Square } {
    return Piece.movePiece(currentSquare, destSquare);
  }
};

export default Piece;
