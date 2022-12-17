"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terms_1 = require("../../logic/Terms");
var start_1 = require("../../formation/setups/start");
var BoardManager_1 = require("../board/BoardManager");
var MoveManager_1 = require("../move/MoveManager");
var Game = /** @class */ (function () {
    function Game(side, id) {
        var _this = this;
        this.currentTurnSide = 'white';
        this.startingFormation = start_1.default;
        // boardObserver: BoardObserver;
        // *: Dictionary that holds the squares that makeup the board
        this.captures = {
            white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
            black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
        };
        this.takeTurn = function () {
            _this.currentTurnSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(_this.currentTurnSide)];
        };
        this.highlightPiece = function (position) {
            var _a;
            if (position) {
                var selectedPiece = (_a = _this.boardManager.boardSquares[position]) === null || _a === void 0 ? void 0 : _a.piece;
                if ((selectedPiece === null || selectedPiece === void 0 ? void 0 : selectedPiece.side) === _this.currentTurnSide) {
                    _this.boardManager.highlightAvailableSquares(selectedPiece);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                _this.boardManager.highlightAvailableSquares();
                return false;
            }
        };
        this.move = function (from, to) {
            var _a;
            var originSquare = _this.boardManager.boardSquares[from];
            var destSquare = _this.boardManager.boardSquares[to];
            var isMoveValid = ((_a = originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece) === null || _a === void 0 ? void 0 : _a.availableMoves.includes(to)) &&
                (originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece.side) === _this.currentTurnSide;
            if (isMoveValid) {
                _this.moveManager.commitMove(originSquare, destSquare);
                _this.takeTurn();
                return true;
            }
            else {
                return false;
            }
        };
        this.undo = function () {
            _this.moveManager.takebackMove();
        };
        this.id = id;
        this.playerSide = side;
        var boardManager = new BoardManager_1.default(this.startingFormation, function () { return _this.currentTurnSide; });
        this.boardManager = boardManager;
        // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
        this.moveManager = new MoveManager_1.default(boardManager); // ?: See if I can get rid of the boardManager parameter
    }
    ;
    return Game;
}());
;
exports.default = Game;
//# sourceMappingURL=Game.js.map