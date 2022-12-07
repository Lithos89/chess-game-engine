"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchObserver = /** @class */ (function () {
    // TODO: Update state once you've added 
    function MatchObserver(match, updateStateCallback) {
        var _this = this;
        this.update = function () {
            _this.updateState(_this.match.getMatchStats());
        };
        console.log(match);
        this.match = match;
        this.updateState = updateStateCallback;
    }
    return MatchObserver;
}());
exports.default = MatchObserver;
//# sourceMappingURL=MatchObserver.js.map