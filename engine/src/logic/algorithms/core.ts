
import { isUndefined } from 'lodash';

// Types, interface, constants, ...
import { ROWS, COLUMNS, type Row, type Column, type Position, type ShortPosition, type BoardDirection } from '../terms';
import { type MoveLine } from './types';

// Utils
import { indexInRange } from '../../utils';

const searchDiagonals = (max?: number | undefined, direction?: BoardDirection) => ({row, col}: Position): MoveLine[] => {
  if (max !== undefined && max < 1) {
    throw Error("Invalid max parameter, please provide only natural numbers");
  };

  const colIndex = COLUMNS.indexOf(col);
  const rowIndex = ROWS.indexOf(row);

  let rowSets: Row[][]; // 1 or 2 sets of rows from current row to first or last row on board

  if (direction === '+') {
    rowSets = [ROWS.slice(rowIndex + 1)];
  } else if (direction === '-') {
    rowSets = [ROWS.slice(0, rowIndex).reverse()];
  } else {
    rowSets = [ROWS.slice(0, rowIndex).reverse(), ROWS.slice(rowIndex + 1)];
  };

  const diagonalLines: MoveLine[] = [];

  // Get diagonal for each SELECTED vertical portion of the board
  for (const rowSet of rowSets) {
    const upperDiagonal: MoveLine = [];
    const lowerDiagonal: MoveLine = [];

    let distance = 1;
    while(distance <= rowSet.length && (max === undefined || distance <= max)) {
      const i = distance - 1;
      
      // Upper Horizontal of Board
      if (indexInRange(colIndex + distance, COLUMNS))
        upperDiagonal.push(`${COLUMNS[colIndex + distance]}${rowSet[i]}`); 

      // Lower Horizontal of Board
      if (indexInRange(colIndex - distance, COLUMNS))
        lowerDiagonal.push(`${COLUMNS[colIndex - distance]}${rowSet[i]}`);

      distance += 1;
    };

    diagonalLines.push(upperDiagonal, lowerDiagonal);
  };

  return diagonalLines;
};

const searchFile = (max?: number | undefined, direction?: BoardDirection) => ({row, col}: Position): MoveLine[] => {
  const verticalLines: MoveLine[] = [];
  const rowIndex = ROWS.indexOf(row);

  let rowSets: Row[][];

  if (direction === '+') {
    rowSets = [ROWS.slice(rowIndex + 1)];
  } else if (direction === '-') {
    rowSets = [ROWS.slice(0, rowIndex).reverse()];
  } else {
    rowSets = [ROWS.slice(0, rowIndex).reverse(), ROWS.slice(rowIndex + 1)];
  };
  
  if (isUndefined(max)) {
    for (const rowSet of rowSets) {
      const fileLine: ShortPosition[] = [];

      for (const _row of rowSet) {
        fileLine.push(`${col}${_row}`);
      };
      verticalLines.push(fileLine);
    };
  } else {
    for (const rowSet of rowSets) {
      const fileLine: ShortPosition[] = [];
      const truncatedRowSet = rowSet.slice(0, max);

      for (const _row of truncatedRowSet) {
        fileLine.push(`${col}${_row}`);
      };
      verticalLines.push(fileLine);
    };
  };

  return verticalLines;
};

const searchRank = (max?: number | undefined, direction?: BoardDirection) => ({row, col}: Position): MoveLine[] => {
  const horizontalLines: MoveLine[] = [];
  const colIndex = COLUMNS.indexOf(col);

  let colSets: Column[][];

  if (direction === '+') {
    colSets = [COLUMNS.slice(colIndex + 1)];
  } else if (direction === '-') {
    colSets = [COLUMNS.slice(0, colIndex).reverse()];
  } else {
    colSets = [COLUMNS.slice(0, colIndex).reverse(), COLUMNS.slice(colIndex + 1)];
  };
  
  if (isUndefined(max)) {
    for (const colSet of colSets) {
      const rankLine: ShortPosition[] = [];

      for (const _col of colSet) {
        rankLine.push(`${_col}${row}`);
      };
      horizontalLines.push(rankLine);
    };
  } else {
    for (const colSet of colSets) {
      const rankLine: ShortPosition[] = [];
      const truncatedColSet = colSet.slice(0, max);

      for (const _col of truncatedColSet) {
        rankLine.push(`${_col}${row}`);
      };
      horizontalLines.push(rankLine);
    };
  };

  return horizontalLines;
};

const searchLs = () => ({row, col}: Position): MoveLine[] => {
  //* T meaning translation in this context
  const squaresFound: ShortPosition[] = [];

  const colIndex = COLUMNS.indexOf(col)
  const rowIndex = ROWS.indexOf(row)

  // [row, col] L translation vectors
  const translations = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [-1, -2], [1, -2]];
  
  // pos indices + translations (broadcasted)
  const posT = translations.map(T => [rowIndex + T[0], colIndex + T[1]]);

  for (const [rowT, colT] of posT) {

    if(indexInRange(rowT, ROWS) && indexInRange(colT, COLUMNS)) {
      const rowPrime = ROWS[rowT];
      const colPrime = COLUMNS[colT];

      squaresFound.push(`${colPrime}${rowPrime}` as ShortPosition);
    };
  };

  // Convert to 2-dimensional array to match other algorithm outputs
  return squaresFound.map(v => [v]);
};

const Search = {
  diagonals: searchDiagonals,
  file: searchFile,
  rank: searchRank,
  Ls: searchLs,
};

export default Search;
