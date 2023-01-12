

import { isNull } from 'lodash';

// Types, interface, constants, ...
import { type Side } from '../../logic/terms';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
// import Piece, { King } from '../../components/piece';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';

export default function sortPieces(board: BoardSquareListings): [basicPieces: { [side in Side]: Piece[] }, kings: { [side in Side] : King}] {
  const basicPieces: { [side in Side]: Piece[] } = {
    white: [],
    black: []
  };
  const kings: { [side in Side]? : King} = {};

  for (const boardPos in board) {
    const square = board[boardPos];
    square.controlled = { white: false, black: false };
    const piece: Piece | null = square.piece;

    if (isNull(piece)) { continue };

    if (piece instanceof King) {
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
};
