import { ShortPosition } from './../Terms';
import { ROWS, COLUMNS, type Row, type Column, type Position } from '../Terms';


const searchFile = (bidirectional: boolean, {row, col}: Position): ShortPosition[] => {
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

const searchDiagonals = ({row, col}: Position): ShortPosition[] => {
  const squaresFound: ShortPosition[] = [];

  for (let i = 0; i < ROWS.length; i++) {
    for (let j = 0; j < COLUMNS.length; j++) {
      if (file === col || Number(ROWS) + Number(file) !== 8) {
        continue;
      } else {
        squaresFound.push(`${file as Column}${row}`);
      }
    }
  };

  return squaresFound;
};