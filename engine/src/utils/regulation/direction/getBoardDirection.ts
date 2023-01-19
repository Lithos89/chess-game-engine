
// Types, interfaces, constants, ...
import { type ShortPosition, type BoardDirection, type Position, COLUMNS, ROWS } from '../../../logic/terms';
import convertPosition from '../position/convertPosition';

function getBoardDirection(from: Position, to: Position, orientation: 'horizontal' | 'vertical'): BoardDirection | null
function getBoardDirection(from: ShortPosition, to: ShortPosition, orientation: 'horizontal' | 'vertical'): BoardDirection | null
function getBoardDirection(from: Position | ShortPosition, to: Position | ShortPosition, orientation: 'horizontal' | 'vertical'): BoardDirection | null {
  from = typeof from === 'string' ? convertPosition(from) : from;
  to = typeof to === 'string' ? convertPosition(to) : to;

  // ? Consider condensing this function to not need the top level if statement
  if (orientation === 'horizontal') {
    const _fromCol = COLUMNS.indexOf(from.col);
    const _toCol = COLUMNS.indexOf(to.col);

    if (_toCol > _fromCol) {
      return '+';
    } else if (_toCol < _fromCol) {
      return '-';
    } else {
      // TODO: Include an error msg here
      throw Error();
    };
  } else {
    const _fromRow = ROWS.indexOf(from.row);
    const _toRow = ROWS.indexOf(to.row);

    if (_toRow > _fromRow) {
      return '+';
    } else if (_toRow < _fromRow) {
      return '-';
    } else {
      // TODO: Include an error msg here
      throw Error();
    };
  };
};

export default getBoardDirection