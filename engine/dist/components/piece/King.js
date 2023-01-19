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
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var Piece_1 = require("./Piece");
// Algorithms
var core_1 = require("../../logic/algorithms/core");
// Utils
var convertPosition_1 = require("../../utils/regulation/position/convertPosition");
var calcDistance_1 = require("../../utils/regulation/position/calcDistance");
var getBoardDirection_1 = require("../../utils/regulation/direction/getBoardDirection");
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(side) {
        var _this = _super.call(this, terms_1.PieceKind.King, side) || this;
        _this.moved = false;
        _this.checks = [];
        _this.influenceEmptySquare = function (square) {
            var enemySide = _this.enemyKing.side;
            if (!square.controlled[enemySide]) {
                var enemyKingControlledSquares = _this.enemyKing.legalLines.flat(2);
                var squareShortPos = (0, convertPosition_1.default)(square.position);
                if (!enemyKingControlledSquares.includes(squareShortPos)) {
                    if ((0, calcDistance_1.default)(_this.position, square.position) > 1) {
                        var castlingDirection = (0, getBoardDirection_1.default)(_this.position, square.position, 'horizontal');
                        var canCastleToSquare = _this.castleAvailableCallback(castlingDirection);
                        if (canCastleToSquare)
                            return true;
                        else
                            return false;
                    }
                    else {
                        square.controlled[_this.side] = true;
                        return true;
                    }
                }
                ;
            }
            ;
            return false;
        };
        _this.influenceOccupiedSquare = function (square) {
            var destPiece = square.piece;
            var simpleCaptureAvailable = !(0, lodash_1.isNull)(destPiece) && destPiece.side !== _this.side;
            if (simpleCaptureAvailable) {
                if (!(destPiece === null || destPiece === void 0 ? void 0 : destPiece.isProtected)) {
                    return true;
                }
                ;
            }
            else {
                destPiece.isProtected = true;
            }
            ;
            return false;
        };
        return _this;
    }
    ;
    King.prototype.loadMoveAlgorithms = function () {
        var rankMoveAlgorithm = this.moved ? core_1.default.rank(1) : core_1.default.rank(2);
        return [core_1.default.file(1), core_1.default.diagonals(1), rankMoveAlgorithm];
    };
    ;
    return King;
}(Piece_1.default));
;
exports.default = King;
//# sourceMappingURL=King.js.map