
// Types, interfaces, constants, ...
import { PieceListing } from 'formation/structure/pieceCollection';
import { type Side, PieceKind, type ShortPosition, type Position } from '../../logic/Terms';

// Components
import { Pawn, Rook, Knight, Bishop, Queen, King } from './index';

import Movable from 'session/move/interfaces/movable';

abstract class Piece {
  readonly side: Side;
  readonly kind: PieceKind;
  position: Position;
  legalLines: ShortPosition[][];
  availableMoves: ShortPosition[];

  abstract updateLegalLines(): void;

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

  getLegalLines(...searchAlgorithms: ((_position: Position) => ShortPosition[][])[]): ShortPosition[][] {
    const legalLines: ShortPosition[][] = [];

    for (const algo of searchAlgorithms) {
      legalLines.push(...algo(this.position));
    };

    console.log(legalLines)

    return legalLines;
  };

  isMovable(): this is Movable {
    return Object.prototype.hasOwnProperty.call(this, "moved")
  };

  // ?: See whether capture should have a default value, be optional, or be required.
  logMove(to: ShortPosition, didCapture: boolean = false) {
    const pieceAbbr = this.kind !== PieceKind.Pawn ? this.kind.toUpperCase() : '';
    const captureMark = didCapture ? 'x' : '';

    return pieceAbbr + captureMark + to;
  };
};

export default Piece;
