"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startingFormation = exports.PieceKind = exports.boardPositions = void 0;
// TODO: Determine if this should be constructed at runtime using column and row or statically implemented like it is right now
exports.boardPositions = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
];
var PieceKind;
(function (PieceKind) {
    PieceKind["Pawn"] = "p";
    PieceKind["Rook"] = "r";
    PieceKind["Knight"] = "h";
    PieceKind["Bishop"] = "b";
    PieceKind["Queen"] = "q";
    PieceKind["King"] = "k";
})(PieceKind = exports.PieceKind || (exports.PieceKind = {}));
;
exports.startingFormation = {
    'a1': { kind: PieceKind.Rook, side: 'black' },
    'a2': { kind: PieceKind.Knight, side: 'black' },
    'a3': { kind: PieceKind.Bishop, side: 'black' },
    'a4': { kind: PieceKind.Queen, side: 'black' },
    'a5': { kind: PieceKind.King, side: 'black' },
    'a6': { kind: PieceKind.Bishop, side: 'black' },
    'a7': { kind: PieceKind.Knight, side: 'black' },
    'a8': { kind: PieceKind.Rook, side: 'black' },
    'b1': { kind: PieceKind.Pawn, side: 'black' },
    'b2': { kind: PieceKind.Pawn, side: 'black' },
    'b3': { kind: PieceKind.Pawn, side: 'black' },
    'b4': { kind: PieceKind.Pawn, side: 'black' },
    'b5': { kind: PieceKind.Pawn, side: 'black' },
    'b6': { kind: PieceKind.Pawn, side: 'black' },
    'b7': { kind: PieceKind.Pawn, side: 'black' },
    'b8': { kind: PieceKind.Pawn, side: 'black' },
    'g1': { kind: PieceKind.Pawn, side: 'white' },
    'g2': { kind: PieceKind.Pawn, side: 'white' },
    'g3': { kind: PieceKind.Pawn, side: 'white' },
    'g4': { kind: PieceKind.Pawn, side: 'white' },
    'g5': { kind: PieceKind.Pawn, side: 'white' },
    'g6': { kind: PieceKind.Pawn, side: 'white' },
    'g7': { kind: PieceKind.Pawn, side: 'white' },
    'g8': { kind: PieceKind.Pawn, side: 'white' },
    'h1': { kind: PieceKind.Rook, side: 'white' },
    'h2': { kind: PieceKind.Knight, side: 'white' },
    'h3': { kind: PieceKind.Bishop, side: 'white' },
    'h4': { kind: PieceKind.Queen, side: 'white' },
    'h5': { kind: PieceKind.King, side: 'white' },
    'h6': { kind: PieceKind.Bishop, side: 'white' },
    'h7': { kind: PieceKind.Knight, side: 'white' },
    'h8': { kind: PieceKind.Rook, side: 'white' },
};
//# sourceMappingURL=Terms.js.map