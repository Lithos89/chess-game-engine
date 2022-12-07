"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSession = void 0;
// Classes
var Match_1 = require("./Match");
var BoardController_1 = require("./board/BoardController");
// session will be used so that broadcasts are appropriately handled
// session will allow for the scaling up of the app in the case of multiple opponents
var Session = /** @class */ (function () {
    function Session(startingSide) {
        if (startingSide === void 0) { startingSide = 'white'; }
        this.matches = [];
        this.startNewMatch(startingSide);
    }
    ;
    // ?: Could also add an 'opponent' parameter in the future
    Session.prototype.startNewMatch = function (playerSide) {
        if (playerSide === void 0) { playerSide = 'white'; }
        var match = new Match_1.default(playerSide);
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
    var session = new Session(side);
    var currentMatch = session.currentMatch;
    var generateNewBoard = function (generator) {
        return function (updateState) {
            var newGame = generator.next().value;
            var boardController = new BoardController_1.default(newGame, updateState);
            var moveController = boardController.moveManager.controller;
            // TODO: Set this is as the type of GameController which I will create or do something along these lines
            var move = moveController.requestMove, select = moveController.selectPiece, undo = moveController.undo;
            return { move: move, select: select, undo: undo };
        };
    };
    var setMatchObserver = function (tempFunc) {
        tempFunc(currentMatch.getMatchStats());
    };
    var resign = currentMatch.resignGame;
    // *: At the moment, you cannot start a new match, therefore passing in a static match works
    var matchController = {
        generateGame: generateNewBoard(currentMatch.gameGenerator),
        observe: setMatchObserver,
        resign: resign
    };
    return { matchController: matchController };
}
exports.startSession = startSession;
;
//# sourceMappingURL=session.js.map