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
var Terms_1 = require("../../logic/Terms");
var Piece_1 = require("./Piece");
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(side) {
        var _this = _super.call(this, Terms_1.PieceKind.Knight) || this;
        _this.side = side;
        return _this;
    }
    ;
    Knight.prototype.move = function (currentSquare, destSquare) {
        Piece_1.default.movePiece(currentSquare, destSquare);
    };
    ;
    return Knight;
}(Piece_1.default));
;
exports.default = Knight;
//# sourceMappingURL=Knight.js.map