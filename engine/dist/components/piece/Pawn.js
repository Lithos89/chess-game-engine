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
var Piece_1 = require("./Piece");
// Algorithms
var core_1 = require("../../logic/algorithms/core");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(side) {
        var _this = _super.call(this, terms_1.PieceKind.Pawn, side) || this;
        // TODO: Fix direction so it works on the alt board orientation
        _this.direction = _this.side === 'white' ? '+' : '-';
        _this.moved = false;
        _this.loadMoveAlgorithms = function () {
            var fileDistance = _this.moved ? 1 : 2;
            return [core_1.default.file(fileDistance, _this.direction)];
        };
        // ?: Could use the constructor for the direction to be implemented correctly using a value that is obtained from the game/board
        _this.captureAlgorithms = [core_1.default.diagonals(1, _this.direction)];
        return _this;
    }
    ;
    return Pawn;
}(Piece_1.default));
;
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map