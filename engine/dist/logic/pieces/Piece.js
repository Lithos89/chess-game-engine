"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// For now I am using piece abbreviations for the purpose of making move records easier but may revise when it comes to initialization
var PieceKind;
(function (PieceKind) {
    PieceKind["Pawn"] = "p";
    PieceKind["Rook"] = "r";
    PieceKind["Knight"] = "k";
    PieceKind["Bishop"] = "b";
    PieceKind["Queen"] = "q";
    PieceKind["King"] = "k";
})(PieceKind || (PieceKind = {}));
;
var Piece = /** @class */ (function () {
    // abstract availablePositions: string;
    // TODO: Come up with a better name that is able to encapsulate this better
    // abstract seekBasicMoves(): string[];
    function Piece(piece) {
        this.kind = piece;
    }
    Piece.prototype.getAvailablePositions = function () {
    };
    return Piece;
}());
;
exports.default = Piece;
//# sourceMappingURL=Piece.js.map