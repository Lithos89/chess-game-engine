
// Types, interface, constants, ...
import { type Row, type Column, type ShortPosition, type Position, SIDES } from '../logic/terms';
import { type PieceListings } from '../formation/structure/pieceCollection';

// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
export function convertPosition(position: ShortPosition | Position): ShortPosition | Position {
  if (typeof position === 'string') {
    return { row: position[1] as Row, col: position[0] as Column } as Position;
  } else if (typeof position === 'object') {
    return `${position.col}${position.row}` as ShortPosition;
  } else {
    throw Error('Unable to convert position of ' + position);
  };
};

// *: Flips a piece configuartion to match the opposite side of the board
export function flipFormation(piecesFormation: PieceListings): PieceListings {
  const altFormation: PieceListings = {};

  for (const pos in piecesFormation) {
    const piece = piecesFormation[pos];
    const newSide = SIDES[1 - SIDES.indexOf(piece.side)];

    altFormation[pos] = { kind: piece.kind, side: newSide };
  };

  return altFormation;
};

export function indexInRange(index: number, array: readonly any[] | any[]) {
  return index >= 0 && index < array.length;
};