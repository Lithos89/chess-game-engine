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
// Game Management
var Game_1 = require("./Game");
// Utils
var getEnemySide_1 = require("../../utils/regulation/side/getEnemySide");
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController(id, side, finishedCallback) {
        if (side === void 0) { side = null; }
        var _this = _super.call(this, id, side) || this;
        _this.selectedSquarePos = null;
        // public promotionSelection = (piece: Exclude<PieceKind, ['k','p']>): Piece => {
        //   let newPiece: Piece;
        //   switch(piece) {
        //     case PieceKind.Bishop:
        //       return PieceKind.Bishop;
        //     case PieceKind.Knight:
        //       return PieceKind.Knight;
        //     case PieceKind.Queen:
        //       return PieceKind.Queen;
        //     case PieceKind.Rook:
        //       return PieceKind.Rook;
        //   };
        // };
        // *: Move highlighting management for selecting/deselecting a square with a piece
        _this.selectSquare = function (position) {
            console.info(position);
            var isNewSelection = (0, lodash_1.isNull)(_this.selectedSquarePos);
            //* Selecting a square while no square is highlighted
            if (isNewSelection) {
                var didHighlight = _this.attemptHighlight(position);
                if (didHighlight)
                    _this.selectedSquarePos = position;
                //* Selecting the same square or a new square, triggering unhighlighting
            }
            else {
                var didUnhighlight = _this.attemptHighlight();
                if (didUnhighlight)
                    _this.selectedSquarePos = null;
            }
            ;
        };
        // TODO: Add more to this function
        _this.move = function (from, to) {
            if (from !== to) {
                return _this.attemptMove(from, to);
            }
            else {
                return false;
            }
            ;
        };
        // TODO: Add more to this function
        _this.requestUndo = function () {
            _this.undo();
        };
        _this.startNextGame = function () {
            if (_this.isOver) {
                _this.startNextGameCallback();
            }
            ;
        };
        _this.resign = function () {
            // *: Give the victory to the opponent
            if (!_this.isOver) {
                _this.isOver = true;
                _this.startNextGameCallback = _this.signalFinish((0, getEnemySide_1.default)(_this.currentTurnSide));
                _this.signalState();
            }
            ;
        };
        _this.signalFinish = finishedCallback;
        _this.signalState('move-controller', {
            selectSquare: _this.selectSquare,
            move: _this.move,
            undo: _this.requestUndo,
            startNext: _this.startNextGame,
            resign: _this.resign,
        });
        return _this;
    }
    ;
    return GameController;
}(Game_1.default));
;
exports.default = GameController;
//# sourceMappingURL=GameController.js.map