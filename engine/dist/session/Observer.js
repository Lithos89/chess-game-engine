"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardObserver_1 = require("./board/BoardObserver");
var MatchObserver_1 = require("./match/MatchObserver");
var Observer = /** @class */ (function () {
    function Observer() {
    }
    Observer.setMatchObserver = function (match, updateStateCallback) {
        if (updateStateCallback === void 0) { updateStateCallback = function () { }; }
        this.matchObservers.set(match, new MatchObserver_1.default(match, updateStateCallback));
    };
    ;
    var _a;
    _a = Observer;
    Observer.matchObservers = new Map();
    Observer.boardObservers = new Map();
    Observer.setBoardObserver = function (boardManager, updateStateCallback) {
        if (updateStateCallback === void 0) { updateStateCallback = function () { }; }
        _a.boardObservers.set(boardManager, new BoardObserver_1.default(boardManager, updateStateCallback));
    };
    return Observer;
}());
;
exports.default = Observer;
//# sourceMappingURL=Observer.js.map