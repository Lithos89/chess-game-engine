"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var gameModel = new Game_1.Game();
console.log(Object.keys(gameModel.squares).length);
for (var key in gameModel.squares) {
    console.log(gameModel.squares[key]);
}
//# sourceMappingURL=index.js.map