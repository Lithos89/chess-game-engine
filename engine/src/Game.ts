import { boardPositions, startingFormation, type ShortPosition, PieceKind, type Side, type Row, type Column } from './logic/Terms';

import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
} from './logic/pieces';

import Square from './logic/Square';
import Piece from './logic/pieces/Piece';


export class Game {
  squares: { [index: string] : Square } = {};

  constructor() {
    this.initializeGame();
  };

  private initializeGame() {
    for (const i in boardPositions) {
      const position = boardPositions[i];

      const side: Side = (Number(i + Number(Math.floor(Number(i)/8) % 2 === 0)) % 2) === 1 ? 'white' : 'black';

      const square = new Square({row: position[1] as Row, col: position[0] as Column}, side);

      if (position in Object.keys(startingFormation)) {
        switch (startingFormation[position]) {
          case PieceKind.Pawn:
            square.setPiece(new Pawn('white'));
            break;
          case PieceKind.Rook:
            square.setPiece(new Rook('white'));
            break;
          case PieceKind.Knight:
            square.setPiece(new Knight('white'));
            break;
          case PieceKind.Bishop:
            square.setPiece(new Bishop('white'));
            break;
          case PieceKind.Queen:
            square.setPiece(new Queen('white'));
            break;
          case PieceKind.King:
            square.setPiece(new King('white'));
            break;
        }
      }

      this.squares[position] = square;
    };
  };

  private initializeSquares() {
  
  }
};
