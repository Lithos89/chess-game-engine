
// Types, interfaces, constants, ...
import { PieceListing } from 'formation/structure/pieceCollection';
import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';

// Components
import { Pawn, Rook, Knight, Bishop, Queen, King } from './index';

abstract class Piece {
  readonly side: Side;
  readonly kind: PieceKind;
  position: Position;
  availableMoves: ShortPosition[];

  abstract updateAvailableMoves(): void;

  static create({ kind, side }: PieceListing): Piece {
    switch (kind) {
      case PieceKind.Pawn:
        return new Pawn(side);
      case PieceKind.Rook:
        return new Rook(side);
      case PieceKind.Knight:
        return new Knight(side);
      case PieceKind.Bishop:
        return new Bishop(side);
      case PieceKind.Queen:
        return new Queen(side);
      case PieceKind.King:
        return new King(side);
      default:
        throw new Error(`Unable to create piece with kind: ${kind}, side: ${side}`);
    };
  };

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

  // ?: See whether capture should have a default value, be optional, or be required.
  logMove(to: ShortPosition, didCapture: boolean = false) {
    const pieceAbbr = this.kind !== PieceKind.Pawn ? this.kind.toUpperCase() : '';
    const captureMark = didCapture ? 'x' : '';

    return pieceAbbr + captureMark + to;
  };
};

export default Piece;
