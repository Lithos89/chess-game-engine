"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../index.js");
describe('sample', function () {
    it('My Greeter', function () {
        var game = new index_js_1.Game();
        game.requestMove(game.boardSquares['g1'].piece, game.boardSquares['f1']);
        expect(game.boardSquares['f1'].piece.kind).toBe('p');
    });
});
//# sourceMappingURL=move.test.js.map