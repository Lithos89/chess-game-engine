"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var terms_1 = require("../../logic/terms");
var Piece = /** @class */ (function () {
    // !: Circular dependence created, need to move this outside the class to solve the problem or come up with something else
    // public static create({ kind, side }: PieceListing): Piece {
    //   switch (kind) {
    //     case PieceKind.Pawn:
    //       return new Pawn(side);
    //     case PieceKind.Rook:
    //       return new Rook(side);
    //     case PieceKind.Knight:
    //       return new Knight(side);
    //     case PieceKind.Bishop:
    //       return new Bishop(side);
    //     case PieceKind.Queen:
    //       return new Queen(side);
    //     case PieceKind.King:
    //       return new King(side);
    //     default:
    //       throw new Error(`Unable to create piece with kind: ${kind}, side: ${side}`);
    //   };
    // };
    function Piece(piece, side) {
        var _this = this;
        this.isProtected = false;
        // If captureAlgorithms left empty, then same logic as movement algorithms
        this.captureAlgorithms = [];
        // public influenceEmptySquare = (controlledSquares, enemyKing?, enemySide?) => (linePos: ShortPosition) => {
        //   controlledSquares.add(linePos);
        //   return true;
        // };
        this.influenceEmptySquare = function (square) {
            square.controlled[_this.side] = true;
            return true;
        };
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
        this.influenceOccupiedSquare = function (square, playableLine) {
            var destPiece = square.piece; //!: destPiece still optional with current implementation, FIX
            var altCapturing = !(0, lodash_1.isEmpty)(_this.captureAlgorithms); // If a piece can still move there without capturing
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
        this.kind = piece;
        this.side = side;
    }
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
    //TODO: Move this into the Dynamic Behaviour interface if you can
    Piece.prototype.altInfluenceEmptySquare = function (square) { return false; };
    ;
    Piece.prototype.altInfluenceOccupiedSquare = function (square, playableLine) { return false; };
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