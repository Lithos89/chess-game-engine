// Types, interfaces, constants, ...
import { type Side, PieceKind, type ShortPosition, type Position } from 'logic/Terms';
import Movable from 'match/move/interfaces/Movable';

// Components
import Square from '../Square';

abstract class Piece implements Movable {
  side: Side;
  kind: PieceKind;
  position: Position
  static movePiece: (arg0: Square, arg1: Square) => { [shortPosition: string] : Square };

  constructor(piece: PieceKind, side: Side) { 
    this.kind = piece;
    this.side = side;
  }

  // this will be an algorithm that will generate the available moves, I'm imagining using generator functions to assist in this
  abstract getAvailablePositions(): ShortPosition[];

  move(currentSquare: Square, destSquare: Square): { [shortPosition: string] : Square } {
    return Piece.movePiece(currentSquare, destSquare);
  }
};

export default Piece;
