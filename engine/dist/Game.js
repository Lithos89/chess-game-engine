"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Terms_1 = require("./Terms");
var start_1 = require("./formation/setups/start");
var Square_1 = require("./components/Square");
var pieces_1 = require("./components/pieces");
var Game = /** @class */ (function () {
    function Game() {
        // *: Dictionary that holds the squares that makeup the board
        this.boardSquares = {};
        this.captured = {
            white: {
                p: 0,
                r: 0,
                h: 0,
                b: 0,
                q: 0,
                k: 0,
            },
            black: {
                p: 0,
                r: 0,
                h: 0,
                b: 0,
                q: 0,
                k: 0,
            }
        };
        this.initializeBoard(start_1.default);
    }
    Game.prototype.requestMove = function (caller, target) {
        target.setPiece(caller);
    };
    ;
    ;
    Game.prototype.createPiece = function (_a) {
        var kind = _a.kind, side = _a.side;
        switch (kind) {
            case Terms_1.PieceKind.Pawn:
                return new pieces_1.Pawn(side);
            case Terms_1.PieceKind.Rook:
                return new pieces_1.Rook(side);
            case Terms_1.PieceKind.Knight:
                return new pieces_1.Knight(side);
            case Terms_1.PieceKind.Bishop:
                return new pieces_1.Bishop(side);
            case Terms_1.PieceKind.Queen:
                return new pieces_1.Queen(side);
            case Terms_1.PieceKind.King:
                return new pieces_1.King(side);
            // TODO: Assign this with the never typescript property
            default:
                return null;
        }
        ;
    };
    ;
    // TODO: replace orientationflipped with the side that the player is on defaulting to white
    Game.prototype.initializeBoard = function (boardConfiguration, side) {
        if (side === void 0) { side = 'white'; }
        // ?: If I include a board flipping function, do it here and pass the new positions to initializeSquares?
        this.initializeSquares(boardConfiguration);
    };
    ;
    Game.prototype.initializeSquares = function (pieceMapping) {
        for (var tileIndex in Terms_1.boardPositions) {
            var position = Terms_1.boardPositions[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var initialPiece = (typeof pieceMapping[position] === 'object') ? this.createPiece(pieceMapping[position]) : null;
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var square = new Square_1.default(position, squareColor, initialPiece);
            this.boardSquares[position] = square;
        }
        ;
    };
    ;
    return Game;
}());
exports.Game = Game;
;
//# sourceMappingURL=Game.js.map