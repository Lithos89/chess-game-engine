"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieceKind = exports.SIDES = exports.BOARD_POSITIONS = exports.ROWS = exports.COLUMNS = void 0;
// BOARD POSITIONING
exports.COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
exports.ROWS = ['1', '2', '3', '4', '5', '6', '7', '8'];
exports.BOARD_POSITIONS = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
];
// SIDE SPECIFIC
exports.SIDES = ['white', 'black'];
/*
  TODO: Review this definition as BoardDirection is better implemented
  + is defined as the direction in which the white pawns advance in an odd numbered game
  - is defined as the direction in which the black pawns advance in an odd numbered game
*/
// PIECE SPECIFIC
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
//# sourceMappingURL=terms.js.map