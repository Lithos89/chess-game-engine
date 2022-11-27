"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Terms_1 = require("./logic/Terms");
var pieces_1 = require("./logic/pieces");
var Square_1 = require("./logic/Square");
var Game = /** @class */ (function () {
    function Game() {
        this.squares = {};
        this.initializeGame();
    }
    ;
    Game.prototype.initializeGame = function () {
        for (var i in Terms_1.boardPositions) {
            var position = Terms_1.boardPositions[i];
            var side = (Number(i + Number(Math.floor(Number(i) / 8) % 2 === 0)) % 2) === 1 ? 'white' : 'black';
            var square = new Square_1.default({ row: position[1], col: position[0] }, side);
            console.log(position);
            if (position in Object.keys(Terms_1.startingFormation)) {
                switch (Terms_1.startingFormation[position]) {
                    case Terms_1.PieceKind.Pawn:
                        square.setPiece(new pieces_1.Pawn('white'));
                        break;
                    case Terms_1.PieceKind.Rook:
                        square.setPiece(new pieces_1.Rook('white'));
                        break;
                    case Terms_1.PieceKind.Knight:
                        square.setPiece(new pieces_1.Knight('white'));
                        break;
                    case Terms_1.PieceKind.Bishop:
                        square.setPiece(new pieces_1.Bishop('white'));
                        break;
                    case Terms_1.PieceKind.Queen:
                        square.setPiece(new pieces_1.Queen('white'));
                        break;
                    case Terms_1.PieceKind.King:
                        square.setPiece(new pieces_1.King('white'));
                        break;
                }
            }
            this.squares[position] = square;
        }
        ;
    };
    ;
    Game.prototype.initializeSquares = function () {
    };
    return Game;
}());
exports.Game = Game;
;
//# sourceMappingURL=Game.js.map