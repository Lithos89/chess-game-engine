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

      const regex = /b|d|f|h/;
      const isEvenRow = regex.test(position);
      
      const side: Side = ((Number(i) % 8) + Number(isEvenRow)) % 2 === 0 ? 'white' : 'black';

      this.squares[position] = new Square({row: position[1] as Row, col: position[0] as Column}, side);
      //!: Temporary
      // this.squares[position].setPiece(new Pawn('white'));

      switch (startingFormation[position]) {
        case PieceKind.Pawn:
          this.squares[position].setPiece(new Pawn('white'));
          break;
        case PieceKind.Rook:
          this.squares[position].setPiece(new Rook('white'));
          break;
        case PieceKind.Knight:
          this.squares[position].setPiece(new Knight('white'));
          break;
        case PieceKind.Bishop:
          this.squares[position].setPiece(new Bishop('white'));
          break;
        case PieceKind.Queen:
          this.squares[position].setPiece(new Queen('white'));
          break;
        case PieceKind.King:
          this.squares[position].setPiece(new King('white'));
          break;
      }
      console.log(this.squares)
    };
  };

  private initializeSquares() {
  
  }
};
