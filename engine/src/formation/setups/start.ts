import { type PieceListings } from '../structure/pieceCollection';
import { PieceKind } from '../../logic/Terms';

// ? In the future, consider converting this file into JSON (see if there is some sort of type specification that I am allowed to set)
// ? and then create some sort of transpiler to map it to a type annotated object
// only do this if you end up making more than one static formation

const startingFormation: PieceListings = {
  'a1': { kind: PieceKind.Rook, side: 'white' },
  'b1': { kind: PieceKind.Knight, side: 'white' },
  'c1': { kind: PieceKind.Bishop, side: 'white' },
  'd1': { kind: PieceKind.Queen, side: 'white' },
  'e1': { kind: PieceKind.King, side: 'white' },
  'f1': { kind: PieceKind.Bishop, side: 'white' },
  'g1': { kind: PieceKind.Knight, side: 'white' },
  'h1': { kind: PieceKind.Rook, side: 'white' },

  'a2': { kind: PieceKind.Pawn, side: 'white' },
  'b2': { kind: PieceKind.Pawn, side: 'white' },
  'c2': { kind: PieceKind.Pawn, side: 'white' },
  'd2': { kind: PieceKind.Pawn, side: 'white' },
  'e2': { kind: PieceKind.Pawn, side: 'white' },
  'f2': { kind: PieceKind.Pawn, side: 'white' },
  'g2': { kind: PieceKind.Pawn, side: 'white' },
  'h2': { kind: PieceKind.Pawn, side: 'white' },


  'a7': { kind: PieceKind.Pawn, side: 'black' },
  'b7': { kind: PieceKind.Pawn, side: 'black' },
  'c7': { kind: PieceKind.Pawn, side: 'black' },
  'd7': { kind: PieceKind.Pawn, side: 'black' },
  'e7': { kind: PieceKind.Pawn, side: 'black' },
  'f7': { kind: PieceKind.Pawn, side: 'black' },
  'g7': { kind: PieceKind.Pawn, side: 'black' },
  'h7': { kind: PieceKind.Pawn, side: 'black' },

  'a8': { kind: PieceKind.Rook, side: 'black' },
  'b8': { kind: PieceKind.Knight, side: 'black' },
  'c8': { kind: PieceKind.Bishop, side: 'black' },
  'd8': { kind: PieceKind.Queen, side: 'black' },
  'e8': { kind: PieceKind.King, side: 'black' },
  'f8': { kind: PieceKind.Bishop, side: 'black' },
  'g8': { kind: PieceKind.Knight, side: 'black' },
  'h8': { kind: PieceKind.Rook, side: 'black' },
};

export default startingFormation;
