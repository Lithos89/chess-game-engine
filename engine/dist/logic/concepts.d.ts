import { type ShortPosition, type Position } from './terms';
import Piece from '../components/piece/Piece';
export type MatchMode = 'computer' | 'local';
export type MoveLine = ShortPosition[];
export type MoveAlgorithm = (_position: Position) => MoveLine[];
export interface Attack {
    attackPiece: Piece;
    frontAttackLine: MoveLine;
}
