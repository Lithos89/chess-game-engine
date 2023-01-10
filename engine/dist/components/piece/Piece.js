"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var terms_1 = require("../../logic/terms");
// Components
var index_1 = require("./index");
var Piece = /** @class */ (function () {
    function Piece(piece, side) {
        this.isProtected = false;
        // If captureAlgorithms left empty, then same logic as movement algorithms
        this.captureAlgorithms = [];
        this.kind = piece;
        this.side = side;
    }
    // abstract emptySquareCallback: (linePos: ShortPosition) => boolean;
    // abstract occupiedSquareCallback: (linePos: ShortPosition, playableLine: MoveLine) => boolean;
    Piece.create = function (_a) {
        var kind = _a.kind, side = _a.side;
        switch (kind) {
            case terms_1.PieceKind.Pawn:
                return new index_1.Pawn(side);
            case terms_1.PieceKind.Rook:
                return new index_1.Rook(side);
            case terms_1.PieceKind.Knight:
                return new index_1.Knight(side);
            case terms_1.PieceKind.Bishop:
                return new index_1.Bishop(side);
            case terms_1.PieceKind.Queen:
                return new index_1.Queen(side);
            case terms_1.PieceKind.King:
                return new index_1.King(side);
            default:
                throw new Error("Unable to create piece with kind: ".concat(kind, ", side: ").concat(side));
        }
        ;
    };
    ;
    ;
    Piece.prototype.isMultiBehavioral = function () {
        // TODO: See if hasOwnProperty can be used for interface method and attatched here
        return Object.prototype.hasOwnProperty.call(this, "moved");
    };
    ;
    Piece.prototype.updateLines = function () {
        var _this = this;
        if (this.isMultiBehavioral()) {
            var _movementAlgorithms = this.loadMoveAlgorithms();
            this.legalLines = _movementAlgorithms.flatMap(function (algo) { return algo(_this.position); });
        }
        else if (this.movementAlgorithms !== null) {
            this.legalLines = this.movementAlgorithms.flatMap(function (algo) { return algo(_this.position); });
        }
        else {
            throw Error;
        }
        ;
        if (!(0, lodash_1.isEmpty)(this.captureAlgorithms))
            this.captureLines = this.captureAlgorithms.flatMap(function (algo) { return algo(_this.position); });
    };
    ;
    // ?: See whether capture should have a default value, be optional, or be required.
    // !: Logmove is a horrible name for how the method works, make sure to change
    Piece.prototype.logMove = function (to, didCapture) {
        if (didCapture === void 0) { didCapture = false; }
        var pieceAbbr = this.kind !== terms_1.PieceKind.Pawn ? this.kind.toUpperCase() : '';
        var captureMark = didCapture ? 'x' : '';
        return pieceAbbr + captureMark + to;
    };
    ;
    return Piece;
}());
;
exports.default = Piece;
//# sourceMappingURL=Piece.js.map