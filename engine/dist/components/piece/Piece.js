"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
var Piece = /** @class */ (function () {
    function Piece(kind, side) {
        var _this = this;
        this.kind = kind;
        this.side = side;
        this.isProtected = false;
        this.influenceEmptySquare = function (square) {
            square.controlled[_this.side] = true;
            return true;
        };
        this.influenceOccupiedSquare = function (square, playableLine) {
            var destPiece = square.piece; //!: destPiece still optional with current implementation, FIX
            var altCapturing = _this.hasAlternativeCapturing(); // If a piece can still move there without capturing
            var simpleCaptureAvailable = (destPiece === null || destPiece === void 0 ? void 0 : destPiece.side) !== _this.side && !altCapturing;
            if (simpleCaptureAvailable) {
                if ((destPiece === null || destPiece === void 0 ? void 0 : destPiece.kind) === terms_1.PieceKind.King) {
                    destPiece.checks.push({ attackPiece: _this, frontAttackLine: playableLine });
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
    }
    ;
    Piece.prototype.isMultiBehavioral = function () {
        // TODO: See if hasOwnProperty can be used for interface method and attatched here
        return Object.prototype.hasOwnProperty.call(this, "moved");
    };
    ;
    Piece.prototype.hasAlternativeCapturing = function () {
        return Object.prototype.hasOwnProperty.call(this, "captureAlgorithms");
    };
    ;
    /*------------------------------------MOVEMENT------------------------------*/
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
        if (this.hasAlternativeCapturing())
            this.captureLines = this.captureAlgorithms.flatMap(function (algo) { return algo(_this.position); });
    };
    ;
    /*------------------------------------MOVE LOGGING-----------------------------*/
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