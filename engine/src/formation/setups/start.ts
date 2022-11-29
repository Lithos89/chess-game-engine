import { type PieceListings } from '../structure';
import { PieceKind } from '../../Terms';

// ? In the future, consider converting this file into JSON (see if there is some sort of type specification that I am allowed to set)
// ? and then create some sort of transpiler to map it to a type annotated object
// only do this if you end up making more than one static formation

const startingFormation: PieceListings = {
  'a1' : { kind: PieceKind.Rook, side: 'black'},
  'a2' : { kind: PieceKind.Knight, side: 'black'},
  'a3' : { kind: PieceKind.Bishop, side: 'black'},
  'a4' : { kind: PieceKind.Queen, side: 'black'},
  'a5' : { kind: PieceKind.King, side: 'black'},
  'a6' : { kind: PieceKind.Bishop, side: 'black'},
  'a7' : { kind: PieceKind.Knight, side: 'black'},
  'a8' : { kind: PieceKind.Rook, side: 'black'},

  'b1' : { kind: PieceKind.Pawn, side: 'black'},
  'b2' : { kind: PieceKind.Pawn, side: 'black'},
  'b3' : { kind: PieceKind.Pawn, side: 'black'},
  'b4' : { kind: PieceKind.Pawn, side: 'black'},
  'b5' : { kind: PieceKind.Pawn, side: 'black'},
  'b6' : { kind: PieceKind.Pawn, side: 'black'},
  'b7' : { kind: PieceKind.Pawn, side: 'black'},
  'b8' : { kind: PieceKind.Pawn, side: 'black'},

  'g1' : { kind: PieceKind.Pawn, side: 'white'},
  'g2' : { kind: PieceKind.Pawn, side: 'white'},
  'g3' : { kind: PieceKind.Pawn, side: 'white'},
  'g4' : { kind: PieceKind.Pawn, side: 'white'},
  'g5' : { kind: PieceKind.Pawn, side: 'white'},
  'g6' : { kind: PieceKind.Pawn, side: 'white'},
  'g7' : { kind: PieceKind.Pawn, side: 'white'},
  'g8' : { kind: PieceKind.Pawn, side: 'white'},

  'h1' : { kind: PieceKind.Rook, side: 'white'},
  'h2' : { kind: PieceKind.Knight, side: 'white'},
  'h3' : { kind: PieceKind.Bishop, side: 'white'},
  'h4' : { kind: PieceKind.Queen, side: 'white'},
  'h5' : { kind: PieceKind.King, side: 'white'},
  'h6' : { kind: PieceKind.Bishop, side: 'white'},
  'h7' : { kind: PieceKind.Knight, side: 'white'},
  'h8' : { kind: PieceKind.Rook, side: 'white'},
};

export default startingFormation;