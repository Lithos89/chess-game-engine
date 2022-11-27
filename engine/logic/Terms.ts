export type Side = 'white' | 'black';

// TODO: Determine if this should be constructed at runtime using column and row or statically implemented like it is right now
export const boardPositions: ShortPosition[] = [
  'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
  'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
  'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
  'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
];


export type Column = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export type Row = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type ShortPosition = `${Column}${Row}`;

export enum PieceKind {
  Pawn = 'p',
  Rook = 'r',
  Knight = 'k',
  Bishop = 'b',
  Queen = 'q',
  King = 'k'
};

type PieceListing = {
  [index: string]: PieceKind;
};

export const startingFormation: PieceListing = {
  'a1' : PieceKind.Rook,
  'a2' : PieceKind.Knight,
  'a3' : PieceKind.Bishop,
  'a4' : PieceKind.Queen,
  'a5' : PieceKind.King,
  'a6' : PieceKind.Bishop,
  'a7' : PieceKind.Knight,
  'a8' : PieceKind.Rook,

  'b1' : PieceKind.Pawn,
  'b2' : PieceKind.Pawn,
  'b3' : PieceKind.Pawn,
  'b4' : PieceKind.Pawn,
  'b5' : PieceKind.Pawn,
  'b6' : PieceKind.Pawn,
  'b7' : PieceKind.Pawn,
  'b8' : PieceKind.Pawn,

  'g1' : PieceKind.Pawn,
  'g2' : PieceKind.Pawn,
  'g3' : PieceKind.Pawn,
  'g4' : PieceKind.Pawn,
  'g5' : PieceKind.Pawn,
  'g6' : PieceKind.Pawn,
  'g7' : PieceKind.Pawn,
  'g8' : PieceKind.Pawn,

  'h1' : PieceKind.Rook,
  'h2' : PieceKind.Knight,
  'h3' : PieceKind.Bishop,
  'h4' : PieceKind.Queen,
  'h5' : PieceKind.King,
  'h6' : PieceKind.Bishop,
  'h7' : PieceKind.Knight,
  'h8' : PieceKind.Rook,
}

export type Position = {
  row: Row,
  col: Column,
};


