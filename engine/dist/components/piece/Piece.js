"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terms_1 = require("../../logic/Terms");
// Components
var index_1 = require("./index");
var Piece = /** @class */ (function () {
    function Piece(piece, side) {
        this.kind = piece;
        this.side = side;
    }
    Piece.create = function (_a) {
        var kind = _a.kind, side = _a.side;
        switch (kind) {
            case Terms_1.PieceKind.Pawn:
                return new index_1.Pawn(side);
            case Terms_1.PieceKind.Rook:
                return new index_1.Rook(side);
            case Terms_1.PieceKind.Knight:
                return new index_1.Knight(side);
            case Terms_1.PieceKind.Bishop:
                return new index_1.Bishop(side);
            case Terms_1.PieceKind.Queen:
                return new index_1.Queen(side);
            case Terms_1.PieceKind.King:
                return new index_1.King(side);
            default:
                throw new Error("Unable to create piece with kind: ".concat(kind, ", side: ").concat(side));
        }
        ;
    };
    ;
    ;
    Piece.prototype.getAvailablePositions = function () {
        var searchAlgorithms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searchAlgorithms[_i] = arguments[_i];
        }
        var availableMoves = [];
        for (var _a = 0, searchAlgorithms_1 = searchAlgorithms; _a < searchAlgorithms_1.length; _a++) {
            var algo = searchAlgorithms_1[_a];
            availableMoves.push.apply(availableMoves, algo(this.position));
        }
        ;
        return availableMoves;
    };
    ;
    // ?: See whether capture should have a default value, be optional, or be required.
    Piece.prototype.logMove = function (to, didCapture) {
        if (didCapture === void 0) { didCapture = false; }
        var pieceAbbr = this.kind !== Terms_1.PieceKind.Pawn ? this.kind.toUpperCase() : '';
        var captureMark = didCapture ? 'x' : '';
        return pieceAbbr + captureMark + to;
    };
    ;
    return Piece;
}());
;
exports.default = Piece;
//# sourceMappingURL=Piece.js.map