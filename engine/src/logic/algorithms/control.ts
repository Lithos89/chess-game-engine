
import { isUndefined } from 'lodash';

// Types, interface, constants, ...
import { ROWS, COLUMNS, type Row, type Column, type Position, type ShortPosition } from '../Terms';

// const tempDiagGen = ({row, col}: Position): ShortPosition[][] => {
//   // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification

//   const colIndex = COLUMNS.indexOf(col);
//   const rowIndex = ROWS.indexOf(row);

//   const col_positive = [];
//   for (let i = colIndex; i < COLUMNS.length; i++) {
//     const row_negative = [];
//     const row_positive = []; 

//     const rowVal = ROWS[i];

//     // colIndex++, rowIndex++
//     for (let j = rowIndex; j < ROWS.length; j++) {
//       const colVal = COLUMNS[j];

//       row_positive.push(`${colVal}${rowVal}`);
//     };
//     // colIndex++, rowIndex--
//     for (let j = rowIndex; j >= 0; j--) {
//       const colVal = COLUMNS[j];

//       row_negative.push(`${colVal}${rowVal}`);
//     };

//     col_positive.push(row_negative, row_positive);
//   };

//   const col_negative = [];
//   for (let i = colIndex; i >= 0; i--) {
//     const row_negative = [];  
//     const row_positive = []; 

//     const rowVal = ROWS[i];

//     // ColIndex--, rowIndex--
//     for (let j = rowIndex; j >= 0; j--) {
//       const colVal = COLUMNS[j];

//       row_negative.push(`${colVal}${rowVal}`);
//     };

//     // ColIndex--, rowIndex++ 
//     for (let j = rowIndex; j < ROWS.length; j++) {
//       const colVal = COLUMNS[j];

//       row_positive.push(`${colVal}${rowVal}`);
//     };

//     col_negative.push(row_negative, row_positive);
//   };

const tempDiagGen = (max: number | undefined, direction?: '+' | '-') => ({row, col}: Position): ShortPosition[] => {
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

  const diagonals: ShortPosition[][] = [];

  for (const rowSet of rowSets) {
    const diagonalSection: ShortPosition[] = [];
    for (const i in rowSet) {
      if (Number(i) >= max) break;

      const diagDist = Number(i) + 1;
      if (0 <= colIndex + diagDist && colIndex + diagDist < COLUMNS.length) {
        diagonalSection.push(`${COLUMNS[colIndex + diagDist]}${rowSet[i]}`); 
      };
      if (0 <= colIndex - diagDist && colIndex - diagDist < COLUMNS.length) {
        diagonalSection.push(`${COLUMNS[colIndex - diagDist]}${rowSet[i]}`); 
      };
    }
    diagonals.push(diagonalSection);
  }

  return diagonals.flat();
};

const searchFile = (max: number | undefined, direction?: '+' | '-') => ({row, col}: Position): ShortPosition[] => {
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
    return goodRows.flat().map(row => `${col}${row as Row}`) as ShortPosition[]
  } else {
    return goodRows.flatMap(fileSect => fileSect.filter((_, i) => i < max))
      .map(row => `${col}${row as Row}`) as ShortPosition[]
  }

  // return squaresFound;
}

export {tempDiagGen, searchFile};