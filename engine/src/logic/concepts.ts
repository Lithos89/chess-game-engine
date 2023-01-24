
// Types, interfaces, constants, ...
import { type ShortPosition, type Position } from './terms';

// Components
import Piece from '../components/piece/Piece';

/*-------------------------------------------GAMEPLAY--------------------------------------------*/

export type MatchMode = 'computer' | 'local'; //? Will add more in the future like 'online'


/*--------------------------------------------MOVEMENT---------------------------------------------*/

export type MoveLine = ShortPosition[]; // Sequence of positions ordered from start to finish

export type MoveAlgorithm = (_position: Position) => MoveLine[];


/*--------------------------------------------CHECKING---------------------------------------------*/

export interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine
};
