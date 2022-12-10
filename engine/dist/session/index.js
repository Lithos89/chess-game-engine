"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSession = void 0;
// Classes
var Session_1 = require("./Session");
function startSession(side) {
    if (side === void 0) { side = 'white'; }
    var session = new Session_1.default(side);
    console.info("test me");
    // *: At the moment, you cannot start a new match, therefore passing in a static match works
    var matchController = {
        newMatch: session.startNewMatch,
        // resign: session.resign,
        // setObserver: session.setMatchObserver,
    };
    return matchController;
}
exports.startSession = startSession;
;
//# sourceMappingURL=index.js.map