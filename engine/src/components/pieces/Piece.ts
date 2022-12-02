import { type Side, PieceKind } from '../../logic/Terms';
import Square from '../Square';

export default abstract class Piece {
  abstract side: Side;
  kind: PieceKind;
  static movePiece: (arg0: Square, arg1: Square) => { [shortPosition: string] : Square };
  // abstract availablePositions: string;

  // TODO: Come up with a better name that is able to encapsulate this better
  // abstract seekBasicMoves(): string[];

  constructor(piece: PieceKind) { 
    this.kind = piece;
  }

  abstract move(currentSquare: Square, destSquare: Square): { [shortPosition: string] : Square }
};