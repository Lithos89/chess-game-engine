
// Types, interface, constants, ...
import { SIDES } from '../../logic/terms';
import { type PieceListings } from '../../formation/structure/pieceCollection';

// *: Flips a piece configuartion to match the opposite side of the board
export default function flipFormation(piecesFormation: PieceListings): PieceListings {
  const altFormation: PieceListings = {};

  for (const pos in piecesFormation) {
    const piece = piecesFormation[pos];
    const newSide = SIDES[1 - SIDES.indexOf(piece.side)];

    altFormation[pos] = { kind: piece.kind, side: newSide };
  };

  return altFormation;
};