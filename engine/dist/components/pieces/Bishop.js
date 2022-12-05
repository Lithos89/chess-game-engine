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
var movement_1 = require("../../logic/algorithms/movement");
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(side) {
        var _this = _super.call(this, Terms_1.PieceKind.Bishop, side) || this;
        _this.updateAvailableMoves = function () {
            _this.availableMoves = _super.prototype.getAvailablePositions.call(_this, movement_1.search.diagonals);
        };
        return _this;
    }
    ;
    return Bishop;
}(Piece_1.default));
;
exports.default = Bishop;
//# sourceMappingURL=Bishop.js.map