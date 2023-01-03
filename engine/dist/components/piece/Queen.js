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
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(side) {
        var _this = _super.call(this, terms_1.PieceKind.Queen, side) || this;
        _this.movementAlgorithms = [core_1.default.diagonals(), core_1.default.file(), core_1.default.rank()];
        return _this;
    }
    ;
    return Queen;
}(Piece_1.default));
;
exports.default = Queen;
//# sourceMappingURL=Queen.js.map