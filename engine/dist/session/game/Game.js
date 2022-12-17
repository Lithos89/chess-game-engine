"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var Terms_1 = require("../../logic/Terms");
var start_1 = require("../../formation/setups/start");
var pieces_1 = require("../../components/pieces");
// Game Management
var BoardManager_1 = require("../board/BoardManager");
var MoveManager_1 = require("../move/MoveManager");
// Utils
var utils_1 = require("../../utils");
var flipped = (0, utils_1.flipFormation)(start_1.default);
var Game = /** @class */ (function () {
    function Game(side, id) {
        var _this = this;
        this.currentTurnSide = 'white';
        this.turnCount = 0;
        //* Returns whether the highlight was performed successfully
        this.attemptHighlight = function (position) {
            var _a;
            if ((0, lodash_1.isString)(position)) {
                var selectedPiece = (_a = _this.boardManager.boardSquares[position]) === null || _a === void 0 ? void 0 : _a.piece;
                if ((selectedPiece instanceof pieces_1.default) &&
                    (0, lodash_1.isEqual)(selectedPiece.side, _this.currentTurnSide)) {
                    _this.boardManager.highlightAvailableMoves(selectedPiece);
                    return true;
                }
                else {
                    return false;
                }
                ;
            }
            else {
                _this.boardManager.highlightAvailableMoves();
                return true;
            }
            ;
        };
        this.attemptMove = function (from, to) {
            var _a;
            var originSquare = _this.boardManager.boardSquares[from];
            var destSquare = _this.boardManager.boardSquares[to];
            //* Move Validity checks
            var isLegal = (_a = originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece) === null || _a === void 0 ? void 0 : _a.availableMoves.includes(to);
            var isValidSide = (0, lodash_1.isEqual)(originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece.side, _this.currentTurnSide);
            if (isLegal && isValidSide) {
                _this.moveManager.commitMove(originSquare, destSquare);
                _this.takeTurn();
                return true;
            }
            else {
                return false;
            }
            ;
        };
        // TODO: Add more checks and functionality here
        this.undo = function () {
            _this.moveManager.takebackMove();
        };
        this.id = id;
        this.playerSide = side;
        var startingFormation = (0, lodash_1.isEqual)(side, 'white') ?
            start_1.default :
            flipped;
        console.info(startingFormation);
        this.boardManager = new BoardManager_1.default(startingFormation, function () { return _this.currentTurnSide; });
        // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
        this.moveManager = new MoveManager_1.default(this.boardManager); // ?: See if I can get rid of the boardManager parameter
    }
    ;
    Game.prototype.takeTurn = function () {
        this.currentTurnSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(this.currentTurnSide)];
        this.turnCount += 1;
    };
    ;
    return Game;
}());
;
exports.default = Game;
//# sourceMappingURL=Game.js.map