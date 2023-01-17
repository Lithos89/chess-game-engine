
// Types, interfaces, constants, ...
import { type ShortPosition, type Column, type Row, type Position, COLUMNS, ROWS } from '../../../logic/terms';

// Components
import Square from '../../../components/Square';

function calcDistance(pos1: ShortPosition, pos2: ShortPosition): number
function calcDistance(pos1: Position, pos2: Position): number
function calcDistance(square1: Square, square2: Square): number
function calcDistance(square1: Square | ShortPosition | Position, square2: Square | ShortPosition | Position): number {
  if (typeof square1 === 'string' && typeof square2 === 'string') {
    const col1 = COLUMNS.indexOf(square1[0] as Column);
    const row1 = ROWS.indexOf(square1[1] as Row);

    const col2 = COLUMNS.indexOf(square2[0] as Column);
    const row2 = ROWS.indexOf(square2[1] as Row);

    const dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
    return dist;
  } else if (square1 instanceof Square && square2 instanceof Square) {
    const col1 = COLUMNS.indexOf(square1.position.col);
    const row1 = ROWS.indexOf(square1.position.row);

    const col2 = COLUMNS.indexOf(square2.position.col);
    const row2 = ROWS.indexOf(square2.position.row);

    const dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
    return dist;
  } else if (typeof square1 === 'object' && typeof square2 === 'object' &&
    !(square1 instanceof Square) && !(square2 instanceof Square)) {
    const col1 = COLUMNS.indexOf(square1.col);
    const row1 = ROWS.indexOf(square1.row);

    const col2 = COLUMNS.indexOf(square2.col);
    const row2 = ROWS.indexOf(square2.row);

    const dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
    return dist;
  } else {
    throw Error();
  };
};

export default calcDistance;
