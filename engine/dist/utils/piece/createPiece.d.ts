import { type Side, PieceKind } from '../../logic/terms';
import Pawn from '../../components/piece/Pawn';
import Rook from '../../components/piece/Rook';
import Queen from '../../components/piece/Queen';
import King from '../../components/piece/King';
import Bishop from '../../components/piece/Bishop';
import Knight from '../../components/piece/Knight';
export default function createPiece(kind: PieceKind, side: Side): King | Rook | Pawn | Queen | Bishop | Knight;
