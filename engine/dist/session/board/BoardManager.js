"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var Terms_1 = require("../../logic/Terms");
// Components
var Square_1 = require("../../components/Square");
var pieces_1 = require("../../components/pieces");
// State Management
var Observer_1 = require("../../observers/Observer");
var BoardManager = /** @class */ (function () {
    function BoardManager(startingFormation, currentTurnSideCallback) {
        var _this = this;
        this.boardSquares = {};
        // TODO: Omit 'K' using some sort of typescript functionality for enums
        this.captures = {
            white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
            black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
        };
        /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/
        this.signalState = function (params) {
            if (params === void 0) { params = []; }
            var boardState = _this.compileBoard(params);
            _this.observer.commitState(boardState);
        };
        // TODO: Make this the single function that calls signalState and have this func be called instead to updateBoard
        this.updateBoard = function () {
            _this.signalState();
        };
        // TODO: Fix the paramters so that it tracks the different highlighted action type
        this.compileBoard = function (highlightedSquarePositions) {
            if (highlightedSquarePositions === void 0) { highlightedSquarePositions = []; }
            var processedBoard = [];
            for (var position in _this.boardSquares) {
                processedBoard.push({
                    position: position,
                    square: {
                        color: _this.boardSquares[position].color,
                        focus: {
                            highlighted: highlightedSquarePositions.includes(position),
                            action: highlightedSquarePositions.includes(position) ? 'move' : null,
                        },
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
        // board highlighting will be acomplished here as well through state updates that will affect boardSquares
        this.highlightAvailableMoves = function (piece) {
            if (piece instanceof pieces_1.default) {
                if (piece.side === _this.getCurrentTurnSide()) {
                    _this.signalState(piece.availableMoves);
                }
            }
            else {
                _this.signalState();
            }
            ;
        };
        this.getCurrentTurnSide = currentTurnSideCallback;
        this.observer = new Observer_1.default(this);
        this.initializeBoard(startingFormation);
    }
    ;
    /*--------------------------------------------INITIALIZATION---------------------------------------------*/
    // TODO: replace orientationflipped with the side that the player is on defaulting to white
    BoardManager.prototype.initializeBoard = function (boardConfiguration, side) {
        if (side === void 0) { side = 'white'; }
        // ?: If I include a board flipping function, do it here and pass the new positions to initializeSquares?
        this.initializeSquares(boardConfiguration);
    };
    ;
    BoardManager.prototype.initializeSquares = function (pieceMapping) {
        for (var tileIndex in Terms_1.BOARD_POSITIONS) {
            var position = Terms_1.BOARD_POSITIONS[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var initialPiece = (typeof pieceMapping[position] === 'object') ? pieces_1.default.create(pieceMapping[position]) : null;
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var square = new Square_1.default(position, squareColor, initialPiece);
            this.boardSquares[position] = square;
        }
        ;
        this.signalState();
    };
    ;
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map