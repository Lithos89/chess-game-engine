import { type Side } from '../Terms.js';

// For now I am using piece abbreviations for the purpose of making move records easier but may revise when it comes to initialization
enum PieceKind {
  Pawn = 'p',
  Rook = 'r',
  Knight = 'k',
  Bishop = 'b',
  Queen = 'q',
  King = 'k'
};

abstract class Piece {
  abstract side: Side;
  kind: PieceKind;
  // abstract availablePositions: string;

  // TODO: Come up with a better name that is able to encapsulate this better
  // abstract seekBasicMoves(): string[];

  constructor(piece: PieceKind) {
    this.kind = piece
  }


  getAvailablePositions() {

  }
};

export default Piece;
