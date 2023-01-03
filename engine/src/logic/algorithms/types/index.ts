
// Types, interfaces, constants, ...
import { type ShortPosition, type Position } from '../../terms';

export type MoveLine = ShortPosition[]; // Sequence of positions ordered from start to finish

export type MoveAlgorithm = (_position: Position) => MoveLine[];
