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
function setMatchObserver(callback, match) {
    Observer_1.default.matchObservers.get(match).setCallback(callback);
}
;
// TODO: Need to remove class drilling by moving logic to the subclasses
function setGameObserver(callback, game) {
    Observer_1.default.gameObservers.get(game).setCallback(callback);
}
;
exports.default = { startSession: startSession, setMatchObserver: setMatchObserver, setGameObserver: setGameObserver };
//# sourceMappingURL=index.js.map