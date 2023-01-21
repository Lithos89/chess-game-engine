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
// import Piece, { King } from './index';
var Piece_1 = require("./Piece");
var King_1 = require("./King");
// Algorithms
var core_1 = require("../../logic/algorithms/core");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kind = terms_1.PieceKind.Pawn;
        // TODO: Fix direction so it works on the alt board orientation
        _this.direction = _this.side === 'white' ? '+' : '-';
        _this.moved = false;
        _this.captureAlgorithms = [core_1.default.diagonals(1, _this.direction)];
        /*-------------------------STANDARD INFLUENCE/MOVEMENT-------------------------*/
        _this.influenceEmptySquare = function () { return true; };
        _this.influenceOccupiedSquare = function () { return false; };
        /*------------------------ALTERNATIVE INFLUENCE/MOVEMENT------------------------*/
        _this.altInfluenceEmptySquare = function (square) {
            square.controlled[_this.side] = true;
            return false;
        };
        _this.altInfluenceOccupiedSquare = function (square, playableLine) {
            var destPiece = square.piece;
            if (destPiece.side !== _this.side) {
                if (destPiece instanceof King_1.default) {
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
        return _this;
    }
    Pawn.prototype.loadMoveAlgorithms = function () {
        var fileDistance = this.moved ? 1 : 2;
        return [core_1.default.file(fileDistance, this.direction)];
    };
    ;
    return Pawn;
}(Piece_1.default));
;
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map