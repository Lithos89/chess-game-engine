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
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedSquarePos = null;
        return _this;
    }
    // *: Move highlighting management for selecting/deselecting a square with a piece
    GameController.prototype.selectSquare = function (position) {
        console.info(position);
        var isNewSelection = (0, lodash_1.isNull)(this.selectedSquarePos);
        //* Selecting a square while no square is highlighted
        if (isNewSelection) {
            var didHighlight = this.attemptHighlight(position);
            if (didHighlight)
                this.selectedSquarePos = position;
            //* Selecting the same square or a new square, triggering unhighlighting
        }
        else {
            var didUnhighlight = this.attemptHighlight();
            if (didUnhighlight)
                this.selectedSquarePos = null;
        }
        ;
    };
    ;
    // TODO: Add more to this function
    GameController.prototype.move = function (from, to) {
        if (from !== to) {
            return this.attemptMove(from, to);
        }
        else {
            return false;
        }
        ;
    };
    ;
    // TODO: Add more to this function
    GameController.prototype.requestUndo = function () {
        this.undo();
    };
    ;
    return GameController;
}(Game_1.default));
;
exports.default = GameController;
//# sourceMappingURL=GameController.js.map