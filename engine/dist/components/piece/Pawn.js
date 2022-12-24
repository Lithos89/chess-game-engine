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
var control_1 = require("../../logic/algorithms/control");
// this.side === 'white' ? '+' : '-'
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(side) {
        var _this = _super.call(this, Terms_1.PieceKind.Pawn, side) || this;
        _this.moved = false;
        _this.updateAvailableMoves = function () {
            var direction = _this.side === 'white' ? '+' : '-';
            var fileDistance = _this.moved ? 1 : 2;
            _this.availableMoves = _super.prototype.getAvailablePositions.call(_this, (0, control_1.searchFile)(fileDistance, direction), (0, control_1.tempDiagGen)(1, direction));
        };
        return _this;
    }
    ;
    return Pawn;
}(Piece_1.default));
;
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map