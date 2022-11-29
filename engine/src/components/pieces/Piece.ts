import { type Side, PieceKind } from '../../Terms';

export default abstract class Piece {
  abstract side: Side;
  kind: PieceKind;
  // abstract availablePositions: string;

  // TODO: Come up with a better name that is able to encapsulate this better
  // abstract seekBasicMoves(): string[];

  constructor(piece: PieceKind) { 
    this.kind = piece
  }


  // getAvailablePositions() {

  // }
};