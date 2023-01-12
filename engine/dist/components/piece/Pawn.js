"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var index_1 = require("./index");
// Algorithms
var core_1 = require("../../logic/algorithms/core");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(side) {
        var _this = _super.call(this, terms_1.PieceKind.Pawn, side) || this;
        // TODO: Fix direction so it works on the alt board orientation
        _this.direction = _this.side === 'white' ? '+' : '-';
        _this.moved = false;
        _this.influenceEmptySquare = function () { return true; };
        _this.influenceOccupiedSquare = function () { return false; };
        _this.altOccupiedSquareCallback = function (square, playableLine) {
            var destPiece = square.piece;
            if (destPiece.side !== _this.side) {
                if (destPiece instanceof index_1.King) {
                    destPiece.checks.push({ attackPiece: _this, frontAttackLine: playableLine });
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                destPiece.isProtected = true;
                return false;
            }
            ;
        };
        // ?: Could use the constructor for the direction to be implemented correctly using a value that is obtained from the game/board
        _this.captureAlgorithms = [core_1.default.diagonals(1, _this.direction)];
        return _this;
    }
    ;
    Pawn.prototype.loadMoveAlgorithms = function () {
        var fileDistance = this.moved ? 1 : 2;
        return [core_1.default.file(fileDistance, this.direction)];
    };
    ;
    Pawn.prototype.altEmptySquareCallback = function (square) {
        square.controlled[this.side] = true;
        return false;
    };
    ;
    return Pawn;
}(index_1.default));
;
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map