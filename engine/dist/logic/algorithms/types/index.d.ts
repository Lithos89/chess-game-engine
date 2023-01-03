import { type ShortPosition, type Position } from '../../terms';
export type MoveLine = ShortPosition[];
export type MoveAlgorithm = (_position: Position) => MoveLine[];
