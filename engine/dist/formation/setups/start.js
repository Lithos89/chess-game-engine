"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terms_1 = require("../../Terms");
// ? In the future, consider converting this file into JSON (see if there is some sort of type specification that I am allowed to set)
// ? and then create some sort of transpiler to map it to a type annotated object
// only do this if you end up making more than one static formation
var startingFormation = {
    'a1': { kind: Terms_1.PieceKind.Rook, side: 'black' },
    'a2': { kind: Terms_1.PieceKind.Knight, side: 'black' },
    'a3': { kind: Terms_1.PieceKind.Bishop, side: 'black' },
    'a4': { kind: Terms_1.PieceKind.Queen, side: 'black' },
    'a5': { kind: Terms_1.PieceKind.King, side: 'black' },
    'a6': { kind: Terms_1.PieceKind.Bishop, side: 'black' },
    'a7': { kind: Terms_1.PieceKind.Knight, side: 'black' },
    'a8': { kind: Terms_1.PieceKind.Rook, side: 'black' },
    'b1': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b2': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b3': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b4': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b5': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b6': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b7': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'b8': { kind: Terms_1.PieceKind.Pawn, side: 'black' },
    'g1': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g2': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g3': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g4': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g5': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g6': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g7': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'g8': { kind: Terms_1.PieceKind.Pawn, side: 'white' },
    'h1': { kind: Terms_1.PieceKind.Rook, side: 'white' },
    'h2': { kind: Terms_1.PieceKind.Knight, side: 'white' },
    'h3': { kind: Terms_1.PieceKind.Bishop, side: 'white' },
    'h4': { kind: Terms_1.PieceKind.Queen, side: 'white' },
    'h5': { kind: Terms_1.PieceKind.King, side: 'white' },
    'h6': { kind: Terms_1.PieceKind.Bishop, side: 'white' },
    'h7': { kind: Terms_1.PieceKind.Knight, side: 'white' },
    'h8': { kind: Terms_1.PieceKind.Rook, side: 'white' },
};
exports.default = startingFormation;
//# sourceMappingURL=start.js.map