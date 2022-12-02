"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSession = void 0;
// Classes
var Match_1 = require("./Match");
// session will be used so that broadcasts are appropriately handled
// session will allow for the scaling up of the app in the case of multiple opponents
var Session = /** @class */ (function () {
    function Session() {
        this.matches = [];
        this.startNewMatch();
    }
    ;
    // ?: Could also add an 'opponent' parameter in the future
    Session.prototype.startNewMatch = function (side) {
        if (side === void 0) { side = 'white'; }
        var match = new Match_1.default(side);
        this.matches.push(match);
        this.updateCurrentMatch();
    };
    Session.prototype.updateCurrentMatch = function (index) {
        if (index === void 0) { index = this.matches.length - 1; }
        this.currentMatch = this.matches[index];
    };
    return Session;
}());
;
function startSession(side) {
    if (side === void 0) { side = 'white'; }
    var session = new Session();
    var currentMatch = session.currentMatch;
    var generateNewBoard = function (generator) { return function () {
        var newGame = generator.next().value;
        var boardSquares = newGame.boardController.boardSquares;
        return boardSquares;
    }; };
    var matchController = {
        generateGame: generateNewBoard(currentMatch.gameGenerator)
    };
    var showcase = function () {
        // console.info(currentGame.id)
        // console.info(gameSquares);
    };
    return { matchController: matchController, showcase: showcase };
}
exports.startSession = startSession;
//# sourceMappingURL=session.js.map