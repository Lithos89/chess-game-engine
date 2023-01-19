"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Game Management
var Session_1 = require("./Session");
// State Management
var Observer_1 = require("../state/Observer");
;
function startSession() {
    var session = new Session_1.default();
    return ({
        newMatch: session.startNewMatch,
    });
}
;
function setMatchObserver(callback, matchId) {
    Observer_1.default.matchObservers.get(matchId).setCallback(callback);
}
;
function setGameObserver(callback, gameId) {
    Observer_1.default.gameObservers.get(gameId).setCallback(callback);
}
;
exports.default = { startSession: startSession, setMatchObserver: setMatchObserver, setGameObserver: setGameObserver };
//# sourceMappingURL=index.js.map