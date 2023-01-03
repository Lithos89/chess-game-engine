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
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(side) {
        var _this = _super.call(this, terms_1.PieceKind.King, side) || this;
        _this.moved = false;
        _this.loadMoveAlgorithms = function () {
            return [
                core_1.default.file(1),
                core_1.default.diagonals(1),
                core_1.default.rank(1)
            ];
        };
        return _this;
    }
    ;
    return King;
}(Piece_1.default));
;
exports.default = King;
//# sourceMappingURL=King.js.map