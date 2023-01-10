
import { isNull } from 'lodash';

// Types, interface, constants, ...
import { type Row, type Column, type ShortPosition, type Position, type Side, SIDES, PieceKind } from '../logic/terms';
import { type PieceListings } from '../formation/structure/pieceCollection';
import { type BoardSquareListings } from '../formation/structure/squareCollection';

// Components
import Piece, { King } from '../components/piece';

// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
export function convertPosition(position: ShortPosition | Position): ShortPosition | Position {
  if (typeof position === 'string') {
    return { row: position[1] as Row, col: position[0] as Column } as Position;
  } else if (typeof position === 'object') {
    return `${position.col}${position.row}` as ShortPosition;
  } else {
    throw Error('Unable to convert position of ' + position);
  };
};

// *: Flips a piece configuartion to match the opposite side of the board
export function flipFormation(piecesFormation: PieceListings): PieceListings {
  const altFormation: PieceListings = {};

  for (const pos in piecesFormation) {
    const piece = piecesFormation[pos];
    const newSide = SIDES[1 - SIDES.indexOf(piece.side)];

    altFormation[pos] = { kind: piece.kind, side: newSide };
  };

  return altFormation;
};

export function sortPieces(board: BoardSquareListings): [basicPieces: { [side in Side]: Piece[] }, kings: { [side in Side] : King}] {
  const basicPieces: { [side in Side]: Piece[] } = {
    white: [],
    black: []
  };
  const kings: { [side in Side]? : King} = {};

  for (const boardPos in board) {
    const square = board[boardPos];
    const piece: Piece | null = square.piece;

    if (isNull(piece)) { continue };

    if (piece.kind === PieceKind.King) {
      if (piece.side === 'white')
        kings.white = piece as King;
      else if (piece.side === 'black') {
        kings.black = piece as King;
      };
    } else {
      if (piece.side === 'white')
        basicPieces.white.push(piece);
      else if (piece.side === 'black') {
        basicPieces.black.push(piece);
      };
    };
  };

  return [basicPieces, kings as {[side in Side] : King}];
}

export function indexInRange(index: number, array: readonly any[] | any[]) {
  return index >= 0 && index < array.length;
};