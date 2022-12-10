"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Terms_1 = require("../../logic/Terms");
var start_1 = require("../../formation/setups/start");
var Game = /** @class */ (function () {
    function Game(side, id) {
        var _this = this;
        this.currentTurnSide = 'white';
        this.startingFormation = start_1.default;
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
            },
        };
        this.takeTurn = function () {
            _this.currentTurnSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(_this.currentTurnSide)];
        };
        this.id = id;
        this.playerSide = side;
    }
    ;
    return Game;
}());
exports.Game = Game;
;
//# sourceMappingURL=Game.js.map