
import { isUndefined } from 'lodash';

// Types, interface, constants, ...
import { ROWS, COLUMNS, type Row, type Column, type Position, type ShortPosition } from '../Terms';

const searchDiagonals = (max: number | undefined, direction?: '+' | '-') => ({row, col}: Position): ShortPosition[][] => {
  // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification

  const colIndex = COLUMNS.indexOf(col);
  const rowIndex = ROWS.indexOf(row);

  let rowSets: Row[][];

  if (direction === '+') {
    rowSets = [ROWS.slice(rowIndex + 1)];
  } else if (direction === '-') {
    rowSets = [ROWS.slice(0, rowIndex).reverse()];
  } else {
    rowSets = [ROWS.slice(0, rowIndex).reverse(), ROWS.slice(rowIndex + 1)];
  }

  const diagonalSects: ShortPosition[][] = [];

  for (const rowSet of rowSets) {
    const diagonalSection: ShortPosition[] = [];
    const diagonalSection1: ShortPosition[] = [];
    const diagonalSection2: ShortPosition[] = [];
    for (const i in rowSet) {
      const distance = Number(i) + 1;
      if (distance > max) break;

      // Side 1
      if (0 <= colIndex + distance && colIndex + distance < COLUMNS.length) {
        diagonalSection1.push(`${COLUMNS[colIndex + distance]}${rowSet[i]}`); 
      };
      // Side 2
      if (0 <= colIndex - distance && colIndex - distance < COLUMNS.length) {
        diagonalSection2.push(`${COLUMNS[colIndex - distance]}${rowSet[i]}`); 
      };
    };
    diagonalSects.push(diagonalSection1, diagonalSection2);
  };

  return diagonalSects;
};

// function * diag(max: number | undefined, direction?: '+' | '-') {
//   const {row, col}: Position = yield;


// }

const searchFile = (max: number | undefined, direction?: '+' | '-') => ({row, col}: Position): ShortPosition[][] => {
  const squaresFound: ShortPosition[] = [];

  let goodRows: Row[][];
  const _row = ROWS.indexOf(row);

  if (direction === '+') {
    goodRows = [ROWS.slice(_row + 1)];
  } else if (direction === '-') {
    goodRows = [ROWS.slice(0, _row).reverse()];
  } else {
    goodRows = [ROWS.slice(0, _row).reverse(), ROWS.slice(_row + 1)];
  };
  
  if (isUndefined(max)) {
    return goodRows.map(v => v.map(row => `${col}${row}`) as ShortPosition[])
  } else {
    return goodRows.map(v => v.filter((_, i) => i < max)
      .map(row => `${col}${row}`) as ShortPosition[]);
  };
};

const searchRank = (max: number | undefined, direction?: '+' | '-') => ({row, col}: Position): ShortPosition[][] => {
  const squaresFound: ShortPosition[] = [];

  let goodColumns: Column[][];
  const _col = COLUMNS.indexOf(col);

  if (direction === '+') {
    goodColumns = [COLUMNS.slice(_col + 1)];
  } else if (direction === '-') {
    goodColumns = [COLUMNS.slice(0, _col).reverse()];
  } else {
    goodColumns = [COLUMNS.slice(0, _col).reverse(), COLUMNS.slice(_col + 1)];
  };
  
  if (isUndefined(max)) {
    return goodColumns.map(v => v.map(col => `${col}${row}`) as ShortPosition[])
  } else {
    return goodColumns.map(v => v.filter((_, i) => i < max)
      .map(col => `${col}${row}`) as ShortPosition[]);
  };
};

const searchLs = ({row, col}: Position): ShortPosition[][] => {
  const squaresFound: ShortPosition[] = [];

  const colIndex = COLUMNS.indexOf(col)
  const rowIndex = ROWS.indexOf(row)

  // col + 2, row +- 1
  // col - 2, row +- 1
  
  // row + 2, col +- 1
  // row - 2, col +-1

  const row_col = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [-1, -2], [1, -2]];
  
  for (const [_row, _col] of row_col) {
    const newRow = rowIndex + _row;
    const newCol = colIndex + _col;

    if (newRow >= 0 && newRow < ROWS.length) {
      if (newCol >= 0 && newCol < COLUMNS.length) {
        squaresFound.push(`${COLUMNS[newCol]}${ROWS[newRow]}` as ShortPosition);
      };
    };
  };

  return squaresFound.map(v => [v]);
};

const Search = {
  diagonals: searchDiagonals,
  file: searchFile,
  rank: searchRank,
  Ls: searchLs,
}

export default Search;
