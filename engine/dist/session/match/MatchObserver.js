"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  !: What needs to be done before further development
  TODO: 1. Clean up callback storage to exist in the match observer
*/
var MatchObserver = /** @class */ (function () {
    // TODO: Update state once you've added 
    function MatchObserver(match, updateStateCallback) {
        var _this = this;
        this.setCallback = function (callback) {
            _this.updateState = callback;
            _this.update();
        };
        this.update = function () { _this.updateState(_this.match.getMatchStats()); };
        this.match = match;
        this.updateState = updateStateCallback;
        this.update();
    }
    ;
    return MatchObserver;
}());
;
exports.default = MatchObserver;
//# sourceMappingURL=MatchObserver.js.map