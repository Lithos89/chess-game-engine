"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var start_1 = require("../../formation/setups/start");
var BoardController_1 = require("../board/BoardController");
var Game = /** @class */ (function () {
    function Game(side, id) {
        // *: Dictionary that holds the squares that makeup the board
        this.captures = {
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
        this.id = id;
        this.playerSide = side;
        // !: Still have to do something with this side prop
        this.boardController = new BoardController_1.default(start_1.default);
    }
    Game.prototype.getGameSquares = function () {
        return this.boardController.boardSquares;
    };
    ;
    return Game;
}());
exports.Game = Game;
;
//# sourceMappingURL=Game.js.map