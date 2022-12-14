"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGameObserver = exports.setMatchObserver = exports.startSession = void 0;
var Observer_1 = require("../observers/Observer");
var Session_1 = require("./Session");
function startSession() {
    var session = new Session_1.default();
    return ({
        newMatch: session.startNewMatch,
    });
}
exports.startSession = startSession;
;
function setMatchObserver(callback, match) {
    Observer_1.default.matchObservers.get(match).setCallback(callback);
}
exports.setMatchObserver = setMatchObserver;
;
// TODO: Need to remove class drilling by moving logic to the subclasses
function setGameObserver(callback, game) {
    Observer_1.default.boardObservers.get(game.boardManager).setCallback(callback);
}
exports.setGameObserver = setGameObserver;
;
//# sourceMappingURL=index.js.map