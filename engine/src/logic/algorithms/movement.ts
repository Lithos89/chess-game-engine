
// Types, interface, constants, ...
import { ROWS, COLUMNS, type Row, type Column, type Position, type ShortPosition } from '../Terms';

const searchFile = (bidirectional: boolean) => ({row, col}: Position): ShortPosition[] => {
  const squaresFound: ShortPosition[] = [];

  for (const rank of ROWS) {
    if (rank === row || (!bidirectional && rank < row )) {
      continue;
    } else {
      squaresFound.push(`${col}${rank as Row}`);
    }
  };

  return squaresFound;
}

const searchRank = ({row, col}: Position): ShortPosition[] => {
  const squaresFound: ShortPosition[] = [];

  for (const file of COLUMNS) {
    if (file === col) {
      continue;
    } else {
      squaresFound.push(`${file as Column}${row}`);
    }
  };

  return squaresFound;
};


// TODO: Analyze the algorithm and see if I can clean up the math into a simpler formula
const searchDiagonals = ({row, col}: Position): ShortPosition[] => {
  const squaresFound: ShortPosition[] = [];

  // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification

  const colIndex = COLUMNS.indexOf(col)
  const rowIndex = ROWS.indexOf(row)
  

  for (const i in ROWS) {
    for (const j in COLUMNS) {
      const rowVal = ROWS[i];
      const colVal = COLUMNS[j];
      if ((rowVal !== row && colVal !== col) && (rowIndex + colIndex === Number(i) + Number(j) || colIndex - rowIndex === Number(j) - Number(i)))
        squaresFound.push(`${colVal}${rowVal}`);
    }
  }

  return squaresFound;
};

// TODO: Update this algorithm with the appropriate logic
const searchLs = ({row, col}: Position): ShortPosition[] => {
  const squaresFound: ShortPosition[] = [];

  // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification

  const colIndex = COLUMNS.indexOf(col)
  const rowIndex = ROWS.indexOf(row)
  

  for (const i in ROWS) {
    for (const j in COLUMNS) {
      const rowVal = ROWS[i];
      const colVal = COLUMNS[j];
      if ((rowVal !== row && colVal !== col) && (rowIndex + colIndex === Number(i) + Number(j) || colIndex - rowIndex === Number(j) - Number(i)))
        squaresFound.push(`${colVal}${rowVal}`);
    }
  }

  return squaresFound;
};

const search = {
  file: searchFile,
  rank: searchRank,
  diagonals: searchDiagonals,
  Ls: searchLs,
};

export default search;