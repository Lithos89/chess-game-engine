"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var Square_1 = require("../../components/Square");
var piece_1 = require("../../components/piece");
// Utils
var utils_1 = require("../../utils");
var BoardManager = /** @class */ (function () {
    function BoardManager(startingFormation, alt, currentTurnSideCallback, updateState) {
        var _this = this;
        this.updateState = updateState;
        this.boardSquares = {};
        this.squareHighlighting = {};
        /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/
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
                    _this.updateState();
                }
                ;
            }
            else {
                _this.squareHighlighting = {};
                _this.updateState();
            }
            ;
        };
        this.getCurrentTurnSide = currentTurnSideCallback;
        this.initBoard(startingFormation, alt);
    }
    ;
    /*--------------------------------------------INITIALIZATION---------------------------------------------*/
    BoardManager.prototype.initBoard = function (pieceConfiguration, flipped) {
        if (flipped === void 0) { flipped = false; }
        pieceConfiguration = flipped ? pieceConfiguration : (0, utils_1.flipFormation)(pieceConfiguration);
        var startingPieces = this.initPieces(pieceConfiguration);
        this.initSquares(startingPieces);
        // this.updateState();
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
        for (var tileIndex in terms_1.BOARD_POSITIONS) {
            var position = terms_1.BOARD_POSITIONS[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var piece = pieceMapping[position] || null;
            // if (piece.kind === PieceKind.King) {
            //   if (piece.side === "white")
            //     this.whiteKing = piece as King;
            //   else
            //     this.blackKing = piece as King;
            // };
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var square = new Square_1.default(position, squareColor, piece);
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