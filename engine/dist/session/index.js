"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGameObserver = exports.setMatchObserver = exports.startSession = void 0;
// Classes
var Session_1 = require("./Session");
function startSession(side) {
    if (side === void 0) { side = 'white'; }
    var session = new Session_1.default(side);
    var matchController = {
        newMatch: session.startNewMatch,
    };
    return matchController;
}
exports.startSession = startSession;
;
function setMatchObserver(callback) {
    var match = Session_1.default.getCurrentSession().getCurrentMatch();
    match.setObserver(callback);
}
exports.setMatchObserver = setMatchObserver;
;
function setGameObserver(callback) {
    var match = Session_1.default.getCurrentSession().getCurrentMatch();
    match.setGameStateCallback(callback);
    // match.gameCallback = callback;
}
exports.setGameObserver = setGameObserver;
;
//# sourceMappingURL=index.js.map