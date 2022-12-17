import { PieceListings } from '../formation/structure/pieceCollection';
// Types, interface, constants, ...
import { type Row, type Column, type ShortPosition, type Position, SIDES } from '../logic/Terms';

// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
export function convertPosition(rawPosition: ShortPosition | Position): ShortPosition | Position {
  if (typeof rawPosition === 'string') {
    return { row: rawPosition[1] as Row, col: rawPosition[0] as Column };
  } else if (typeof rawPosition === 'object') {
    return;
  };
};

export function flipFormation(piecesFormation: PieceListings): PieceListings {
  const flippedPieces: PieceListings = {};

  for (const pos in piecesFormation) {
    const piece = piecesFormation[pos]

    const newSide = SIDES[1 - SIDES.indexOf(piece.side)];

    flippedPieces[pos] = { kind: piece.kind, side: newSide};
  };

  return flippedPieces;
};
