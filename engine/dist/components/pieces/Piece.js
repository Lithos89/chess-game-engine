"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    // TODO: Come up with a better name that is able to encapsulate this better
    // abstract seekBasicMoves(): string[];
    function Piece(piece, side) {
        this.kind = piece;
        this.side = side;
    }
    Piece.prototype.move = function (currentSquare, destSquare) {
        return Piece.movePiece(currentSquare, destSquare);
    };
    return Piece;
}());
;
exports.default = Piece;
//# sourceMappingURL=Piece.js.map