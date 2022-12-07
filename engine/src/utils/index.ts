// Types, interface, constants, ...
import { type Row, type Column, type ShortPosition, type Position } from '../logic/Terms';

// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
export function convertPosition(rawPosition: ShortPosition | Position): ShortPosition | Position {
  if (typeof rawPosition === 'string') {
    return { row: rawPosition[1] as Row, col: rawPosition[0] as Column };
  } else if (typeof rawPosition === 'object') {
    return;
  };
};
