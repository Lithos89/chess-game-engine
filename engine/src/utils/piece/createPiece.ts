
// Types, interfaces, constants, ...
import { type Side, PieceKind } from '../../logic/terms';

// Components
import Pawn from '../../components/piece/Pawn';
import Rook from '../../components/piece/Rook';
import Queen from '../../components/piece/Queen';
import King from '../../components/piece/King';
import Bishop from '../../components/piece/Bishop';
import Knight from '../../components/piece/Knight';

export default function createPiece(kind: PieceKind, side: Side) {
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
