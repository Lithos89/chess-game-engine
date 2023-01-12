"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var terms_1 = require("../../logic/terms");
var index_1 = require("./index");
var Piece = /** @class */ (function () {
    function Piece(piece, side) {
        this.isProtected = false;
        // If captureAlgorithms left empty, then same logic as movement algorithms
        this.captureAlgorithms = [];
        this.kind = piece;
        this.side = side;
    }
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
    // public influenceEmptySquare = (controlledSquares, enemyKing?, enemySide?) => (linePos: ShortPosition) => {
    //   controlledSquares.add(linePos);
    //   return true;
    // };
    Piece.prototype.influenceEmptySquare = function (square) {
        square.controlled[this.side] = true;
        return true;
    };
    ;
    // public influenceOccupiedSquare = (board, protectedPieces, checks) => (linePos: ShortPosition, playableLine: MoveLine) => {
    //   const destPiece: Piece = board[linePos].piece;
    //   const altCapturing = !isEmpty(this.captureAlgorithms); // If a piece can still move there without capturing
    //   const simpleCaptureAvailable: boolean = destPiece?.side !== this.side && !altCapturing;
    //   if (simpleCaptureAvailable) {
    //     if (destPiece?.kind === PieceKind.King) {
    //       checks.push({ attackPiece: this, frontAttackLine: playableLine });
    //     } else {
    //       return true;
    //     };
    //   } else {
    //     destPiece.isProtected = true;
    //     protectedPieces.push(destPiece);
    //   };
    //   return false; 
    // };
    Piece.prototype.influenceOccupiedSquare = function (square, playableLine) {
        var destPiece = square.piece;
        var altCapturing = !(0, lodash_1.isEmpty)(this.captureAlgorithms); // If a piece can still move there without capturing
        var simpleCaptureAvailable = destPiece.side !== this.side && !altCapturing;
        if (simpleCaptureAvailable) {
            if (destPiece instanceof index_1.King) {
                destPiece.checks.push({ attackPiece: this, frontAttackLine: playableLine });
            }
            else {
                return true;
            }
            ;
        }
        else {
            destPiece.isProtected = true;
        }
        ;
        return false;
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
exports.default = Piece;
;
//# sourceMappingURL=Piece.js.map