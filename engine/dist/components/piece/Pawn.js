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
var Terms_1 = require("../../logic/Terms");
// Components
var Piece_1 = require("./Piece");
// Algorithms
// import Search from '../../logic/algorithms/movement';
var core_1 = require("../../logic/algorithms/core");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(side) {
        var _this = _super.call(this, Terms_1.PieceKind.Pawn, side) || this;
        _this.moved = false;
        _this.updateAvailableMoves = function () {
            var direction = _this.side === 'white' ? '+' : '-';
            var fileDistance = _this.moved ? 1 : 2;
            _this.availableMoves = _super.prototype.getAvailablePositions.call(_this, core_1.default.file(fileDistance, direction));
        };
        return _this;
    }
    ;
    return Pawn;
}(Piece_1.default));
;
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map