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
// Components
var Square_1 = require("../../components/Square");
var piece_1 = require("../../components/piece");
// State Management
var Observer_1 = require("../../state/Observer");
// Utils
var utils_1 = require("../../utils");
var BoardManager = /** @class */ (function () {
    function BoardManager(startingFormation, alt, currentTurnSideCallback) {
        var _this = this;
        this.boardSquares = {};
        this.squareHighlighting = {};
        // TODO: Omit 'K' using some sort of typescript functionality for enums
        this.captures = {
            white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
            black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
        };
        /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/
        this.signalState = function (type, data) {
            switch (type) {
                case 'board': {
                    var boardState_1 = _this.compileBoard();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { board: boardState_1 })); });
                    break;
                }
                case 'move-log': {
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { moveLog: data })); });
                    break;
                }
                default: {
                    var boardState = _this.compileBoard();
                    _this.observer.commitState({ board: boardState });
                    break;
                }
            }
            ;
        };
        this.notifyBoardUpdated = function () { _this.signalState('board'); };
        this.notifyMoveLogUpdated = function (log) { _this.signalState('move-log', log); };
        // TODO: Fix the paramters so that it tracks the different highlighted action type
        this.compileBoard = function () {
            var processedBoard = [];
            for (var position in _this.boardSquares) {
                processedBoard.push({
                    position: position,
                    square: {
                        color: _this.boardSquares[position].color,
                        focus: (position in _this.squareHighlighting) ?
                            _this.squareHighlighting[position] :
                            { highlighted: false, action: null },
                    },
                    piece: _this.boardSquares[position].piece ?
                        {
                            kind: _this.boardSquares[position].piece.kind,
                            side: _this.boardSquares[position].piece.side,
                        } : null
                });
            }
            ;
            return processedBoard;
        };
        /*--------------------------------------------HIGHLIGHTING---------------------------------------------*/
        this.highlightMoves = function (piece) {
            var _a;
            if (piece instanceof piece_1.default) {
                if (piece.side === _this.getCurrentTurnSide()) {
                    //* Highlighting the available moves of the piece
                    for (var _i = 0, _b = piece.availableMoves; _i < _b.length; _i++) {
                        var pos = _b[_i];
                        _this.squareHighlighting[pos] = {
                            highlighted: true,
                            action: (0, lodash_1.isNull)((_a = _this.boardSquares[pos]) === null || _a === void 0 ? void 0 : _a.piece) ? "move" : "capture",
                        };
                    }
                    ;
                    //* Highlighting the piece (using 'null' for now but may change)
                    _this.squareHighlighting[(0, utils_1.convertPosition)(piece.position)] = {
                        highlighted: true,
                        action: null,
                    };
                    _this.notifyBoardUpdated();
                }
                ;
            }
            else {
                _this.squareHighlighting = {};
                _this.notifyBoardUpdated();
            }
            ;
        };
        this.getCurrentTurnSide = currentTurnSideCallback;
        this.observer = new Observer_1.default(this);
        this.initBoard(startingFormation, alt);
    }
    ;
    /*--------------------------------------------INITIALIZATION---------------------------------------------*/
    BoardManager.prototype.initBoard = function (pieceConfiguration, flipped) {
        if (flipped === void 0) { flipped = false; }
        pieceConfiguration = flipped ? pieceConfiguration : (0, utils_1.flipFormation)(pieceConfiguration);
        var startingPieces = this.initPieces(pieceConfiguration);
        this.initSquares(startingPieces);
        this.notifyBoardUpdated();
    };
    ;
    BoardManager.prototype.initPieces = function (pieceConfiguration) {
        var initialPieces = {};
        for (var pos in pieceConfiguration) {
            initialPieces[pos] = piece_1.default.create(pieceConfiguration[pos]);
        }
        ;
        return initialPieces;
    };
    ;
    BoardManager.prototype.initSquares = function (pieceMapping) {
        for (var tileIndex in Terms_1.BOARD_POSITIONS) {
            var position = Terms_1.BOARD_POSITIONS[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var initialPiece = pieceMapping[position] || null;
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var square = new Square_1.default(position, squareColor, initialPiece);
            this.boardSquares[position] = square;
        }
        ;
    };
    ;
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map