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
exports.__esModule = true;
var Terms_js_1 = require("../Terms.js");
var Piece_js_1 = require("./Piece.js");
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(side) {
        var _this = _super.call(this, Terms_js_1.PieceKind.Queen) || this;
        _this.side = side;
        return _this;
    }
    ;
    return Queen;
}(Piece_js_1["default"]));
;
exports["default"] = Queen;
