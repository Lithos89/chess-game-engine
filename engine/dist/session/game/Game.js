"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var Terms_1 = require("../../logic/Terms");
var start_1 = require("../../formation/setups/start");
var piece_1 = require("../../components/piece");
// Game Management
var BoardManager_1 = require("../board/BoardManager");
var MoveManager_1 = require("../move/MoveManager");
// State Management
var Observer_1 = require("../../state/Observer");
var Game = /** @class */ (function () {
    function Game(side, id) {
        var _this = this;
        this.startingFormation = start_1.default;
        this.currentTurnSide = 'white';
        this.turnCount = 0;
        this.signalState = function (type) {
            switch (type) {
                case 'board': {
                    var boardState_1 = _this.boardManager.compileBoard();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { board: boardState_1 })); });
                    break;
                }
                case 'capture': {
                    var captures_1 = _this.moveManager.captures;
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { captures: captures_1 })); });
                    break;
                }
                case 'move-log': {
                    var moveHistory_1 = _this.moveManager.getMoveHistory();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { moveLog: moveHistory_1 })); });
                    break;
                }
                default: {
                    var boardState = _this.boardManager.compileBoard();
                    var moveHistory = _this.moveManager.getMoveHistory();
                    _this.observer.commitState({ board: boardState, moveLog: moveHistory });
                    break;
                }
            }
            ;
        };
        //* Returns whether the highlight was performed successfully
        this.attemptHighlight = function (position) {
            var _a;
            if ((0, lodash_1.isString)(position)) {
                var selectedPiece = (_a = _this.boardManager.boardSquares[position]) === null || _a === void 0 ? void 0 : _a.piece;
                if ((selectedPiece instanceof piece_1.default) && (0, lodash_1.isEqual)(selectedPiece.side, _this.currentTurnSide)) {
                    _this.boardManager.highlightMoves(selectedPiece);
                    return true;
                }
                else {
                    return false;
                }
                ;
            }
            else {
                _this.boardManager.highlightMoves();
                return true;
            }
            ;
        };
        this.attemptMove = function (from, to) {
            var _a;
            var originSquare = _this.boardManager.boardSquares[from];
            var destSquare = _this.boardManager.boardSquares[to];
            //* Move Validity checks
            var isLegal = (_a = originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece) === null || _a === void 0 ? void 0 : _a.legalLines.flat().includes(to);
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
        this.updateMoves = function (board) {
            for (var i in board) {
                var square = board[i];
                if (square.piece) {
                    var pieceSide = square.piece.side;
                    var playableLines = [];
                    console.info(square.piece.legalLines);
                    for (var _i = 0, _a = square.piece.legalLines; _i < _a.length; _i++) {
                        var legalLine = _a[_i];
                        var playableLine = [];
                        for (var _b = 0, legalLine_1 = legalLine; _b < legalLine_1.length; _b++) {
                            var pos = legalLine_1[_b];
                            if (board[pos].piece === null) {
                                playableLine.push(pos);
                            }
                            else {
                                if (board[pos].piece.side !== pieceSide && board[pos].piece.kind !== Terms_1.PieceKind.Pawn) {
                                    playableLine.push(pos);
                                }
                                ;
                                break;
                            }
                            ;
                        }
                        ;
                        playableLines.push(playableLine);
                    }
                    square.piece.availableMoves = playableLines.flat();
                }
                ;
            }
            ;
        };
        // TODO: Add more checks and functionality here
        this.undo = function () {
            _this.moveManager.takebackMove();
        };
        this.id = id;
        this.playerSide = side;
        this.observer = new Observer_1.default(this);
        var altBoard = side === "white";
        this.boardManager = new BoardManager_1.default(this.startingFormation, altBoard, function () { return _this.currentTurnSide; }, function () { return _this.signalState('board'); });
        // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
        this.moveManager = new MoveManager_1.default(function (type) { return _this.signalState(type); }); // ?: See if I can get rid of the boardManager parameter
        this.updateMoves(this.boardManager.boardSquares);
    }
    ;
    //--------------------------------HIGHLIGHTING AND MOVEMENT----------------//
    Game.prototype.takeTurn = function () {
        this.updateMoves(this.boardManager.boardSquares);
        this.currentTurnSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(this.currentTurnSide)];
        this.turnCount += 1;
    };
    ;
    return Game;
}());
;
exports.default = Game;
//# sourceMappingURL=Game.js.map