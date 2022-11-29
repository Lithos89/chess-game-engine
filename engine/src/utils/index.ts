import { Row, Column } from '../Terms';
import { ShortPosition } from '../Terms';

// TODO: Need to either fix type implementation or provide overrides for the different types of possible inputs
export function getSquareColor(position: ShortPosition): [row: Row, col: Column] {
  return [position[1] as Row, position[0] as Column]
};