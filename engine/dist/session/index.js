"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSession = void 0;
// Classes
var Match_1 = require("./match/Match");
var MatchObserver_1 = require("./match/MatchObserver");
// session will be used so that broadcasts are appropriately handled
// session will allow for the scaling up of the app in the case of multiple opponents
var Session = /** @class */ (function () {
    function Session(startingSide) {
        if (startingSide === void 0) { startingSide = 'white'; }
        var _this = this;
        this.matches = [];
        this.resign = function () {
            _this.currentMatch.resignGame();
            var moveController = _this.startNewGame(_this.tempCallback);
            _this.matchObserver.update();
            return moveController;
        };
        this.setMatchObserver = function (updateMatchStateCallback) {
            _this.matchObserver = new MatchObserver_1.default(_this.currentMatch, updateMatchStateCallback);
            _this.matchObserver.update();
        };
        this.startNewGame = function (updateBoardStateCallback) {
            var moveController = _this.currentMatch.startNewGame(updateBoardStateCallback);
            _this.tempCallback = updateBoardStateCallback;
            _this.matchObserver.update();
            return moveController;
        };
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
    // *: At the moment, you cannot start a new match, therefore passing in a static match works
    var matchController = {
        generateGame: session.startNewGame,
        resign: session.resign,
        observe: session.setMatchObserver,
    };
    return { matchController: matchController };
}
exports.startSession = startSession;
;
//# sourceMappingURL=index.js.map