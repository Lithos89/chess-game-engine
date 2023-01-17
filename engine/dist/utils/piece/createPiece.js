"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var Pawn_1 = require("../../components/piece/Pawn");
var Rook_1 = require("../../components/piece/Rook");
var Queen_1 = require("../../components/piece/Queen");
var King_1 = require("../../components/piece/King");
var Bishop_1 = require("../../components/piece/Bishop");
var Knight_1 = require("../../components/piece/Knight");
function createPiece(kind, side) {
    switch (kind) {
        case terms_1.PieceKind.Pawn:
            return new Pawn_1.default(side);
        case terms_1.PieceKind.Rook:
            return new Rook_1.default(side);
        case terms_1.PieceKind.Knight:
            return new Knight_1.default(side);
        case terms_1.PieceKind.Bishop:
            return new Bishop_1.default(side);
        case terms_1.PieceKind.Queen:
            return new Queen_1.default(side);
        case terms_1.PieceKind.King:
            return new King_1.default(side);
        default:
            throw new Error("Unable to create piece with kind: ".concat(kind, ", side: ").concat(side));
    }
    ;
}
exports.default = createPiece;
;
//# sourceMappingURL=createPiece.js.map