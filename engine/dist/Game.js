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
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var side = ((Number(i) % 8) + Number(isEvenRow)) % 2 === 0 ? 'white' : 'black';
            this.squares[position] = new Square_1.default({ row: position[1], col: position[0] }, side);
            //!: Temporary
            // this.squares[position].setPiece(new Pawn('white'));
            switch (Terms_1.startingFormation[position]) {
                case Terms_1.PieceKind.Pawn:
                    this.squares[position].setPiece(new pieces_1.Pawn('white'));
                    break;
                case Terms_1.PieceKind.Rook:
                    this.squares[position].setPiece(new pieces_1.Rook('white'));
                    break;
                case Terms_1.PieceKind.Knight:
                    this.squares[position].setPiece(new pieces_1.Knight('white'));
                    break;
                case Terms_1.PieceKind.Bishop:
                    this.squares[position].setPiece(new pieces_1.Bishop('white'));
                    break;
                case Terms_1.PieceKind.Queen:
                    this.squares[position].setPiece(new pieces_1.Queen('white'));
                    break;
                case Terms_1.PieceKind.King:
                    this.squares[position].setPiece(new pieces_1.King('white'));
                    break;
            }
            console.log(this.squares);
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