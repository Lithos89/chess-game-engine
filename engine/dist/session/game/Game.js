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
var start_1 = require("../../formation/setups/start");
var Piece_1 = require("../../components/piece/Piece");
// Game Management
var BoardManager_1 = require("../board/BoardManager");
var MoveManager_1 = require("../move/MoveManager");
var EventManager_1 = require("./EventManager");
// State Management
var Observer_1 = require("../../state/Observer");
var getEnemySide_1 = require("../../utils/regulation/side/getEnemySide");
var Game = /** @class */ (function () {
    function Game(id, playerSide) {
        if (playerSide === void 0) { playerSide = null; }
        var _this = this;
        this.playerSide = playerSide;
        this.startingFormation = start_1.default;
        // readonly playerSide: Side | null = null;
        this.currentTurnSide = 'white';
        this.turnCount = 0;
        this.isOver = false;
        this.startNextGameCallback = function () { };
        this.signalState = function (type, data) {
            var _a;
            switch (type) {
                case 'board': {
                    var boardState_1 = _this.boardManager.compileBoard();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { finished: _this.isOver, board: boardState_1, currentTurnSide: _this.currentTurnSide })); });
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
                case 'move-controller': {
                    var moveController_1 = data;
                    _this.moveController = moveController_1;
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { moveController: moveController_1, currentTurnSide: _this.currentTurnSide })); });
                    break;
                }
                default: {
                    var boardState = _this.boardManager.compileBoard();
                    var moveHistory = _this.moveManager.getMoveHistory();
                    var moveController = (_a = _this.moveController) !== null && _a !== void 0 ? _a : {};
                    _this.observer.commitState({
                        board: boardState,
                        moveLog: moveHistory,
                        currentTurnSide: _this.currentTurnSide,
                        finished: _this.isOver,
                        moveController: moveController,
                        captures: _this.moveManager.captures
                    });
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
                if ((selectedPiece instanceof Piece_1.default) && (0, lodash_1.isEqual)(selectedPiece.side, _this.currentTurnSide) && (!_this.playerSide || (0, lodash_1.isEqual)(_this.currentTurnSide, _this.playerSide))) {
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
            var isLegal = (_a = originSquare.piece) === null || _a === void 0 ? void 0 : _a.availableMoves.includes(to);
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
        this.genRandomMove = function (side) {
            var possibleMoves = [];
            Object.keys(_this.boardManager.boardSquares).forEach(function (pos) {
                var piece = _this.boardManager.boardSquares[pos].piece;
                if ((piece === null || piece === void 0 ? void 0 : piece.side) === side) {
                    piece.availableMoves.forEach(function (val) {
                        possibleMoves.push([pos, val]);
                    });
                }
                ;
            });
            var _selection = Math.floor(Math.random() * possibleMoves.length);
            return possibleMoves[_selection];
        };
        // TODO: Add more checks and functionality here
        this.undo = function () {
            _this.moveManager.takebackMove();
        };
        this.updateMoves = function (sideLastMoved) {
            var checks = [];
            _this.boardManager.processAvailableMoves(checks, sideLastMoved);
            if (!(0, lodash_1.isEmpty)(checks) && !(0, lodash_1.isUndefined)(sideLastMoved)) {
                var isCheckmate = (Array.from(checks))
                    .map(function (attack) { return EventManager_1.default.forceCheckResolve(_this.boardManager.boardSquares, attack, sideLastMoved); })
                    .some(Boolean);
                console.info(_this.boardManager.boardSquares);
                if (isCheckmate) {
                    console.info("Checkmate");
                    _this.isOver = true;
                    if (_this.playerSide) {
                        if (_this.playerSide === _this.currentTurnSide) {
                            console.info(_this.playerSide + 'has won');
                        }
                        else {
                            console.info('The computer has won');
                        }
                    }
                }
                else {
                    console.info("Check");
                }
                ;
            }
            ;
            _this.signalState('board');
        };
        this.id = id;
        this.observer = new Observer_1.default(this);
        this.boardManager = new BoardManager_1.default(this.startingFormation, function () { return _this.currentTurnSide; }, function () { return _this.signalState('board'); });
        // ?: Will also pass in a parameter or two to facilitate the game pattern (turn, if someone has won)
        this.moveManager = new MoveManager_1.default(function (type) { return _this.signalState(type); }, function (king, direction) { return _this.boardManager.commitCastle(king, direction); });
        this.updateMoves();
        if (this.playerSide && this.currentTurnSide !== this.playerSide) {
            this.takeComputerTurn();
        }
    }
    ;
    //--------------------------------HIGHLIGHTING AND MOVEMENT----------------//
    Game.prototype.takeTurn = function () {
        this.turnCount += 1;
        this.updateMoves(this.currentTurnSide);
        if (this.isOver) {
            this.startNextGameCallback = this.signalFinish(this.currentTurnSide);
        }
        this.currentTurnSide = (0, getEnemySide_1.default)(this.currentTurnSide);
        if (this.playerSide && this.currentTurnSide !== this.playerSide && !this.isOver) {
            this.takeComputerTurn();
        }
        ;
    };
    ;
    Game.prototype.takeComputerTurn = function () {
        var _this = this;
        var _a = this.genRandomMove(this.currentTurnSide), from = _a[0], to = _a[1];
        setTimeout(function () {
            _this.moveManager.commitMove(_this.boardManager.boardSquares[from], _this.boardManager.boardSquares[to]);
            _this.takeTurn();
        }, 1000);
    };
    ;
    return Game;
}());
;
exports.default = Game;
//# sourceMappingURL=Game.js.map