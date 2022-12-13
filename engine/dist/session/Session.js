"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var Match_1 = require("./match/Match");
/*
  * session will be used so that broadcasts are appropriately handled
  * session will allow for the scaling up of the app in the case of multiple opponents
*/
var Session = /** @class */ (function () {
    function Session() {
        var _this = this;
        this.matches = [];
        // ?: Could also add an 'opponent' parameter in the future (if players/different AI's become available)
        this.startNewMatch = function (playerSide) {
            if (playerSide === void 0) { playerSide = 'white'; }
            var match = new Match_1.default(playerSide);
            _this.matches.push(match);
            _this.updateCurrentMatch();
            return match;
        };
        // ?: Could use an index system to get an active match from the active matches array
        this.getCurrentMatch = function () {
            if (_this.currentMatch instanceof Match_1.default) {
                return _this.currentMatch;
            }
            else {
                var exhaustiveCheck = _this.currentMatch;
                throw new Error(exhaustiveCheck);
            }
            ;
        };
        Session.getCurrentSession = function () { return _this; };
    }
    ;
    // ?: Could make it so that it update the currently active matches, allowing for more than one match to be active at the same time
    Session.prototype.updateCurrentMatch = function (index) {
        if (index === void 0) { index = this.matches.length - 1; }
        this.currentMatch = this.matches[index];
    };
    ;
    return Session;
}());
;
exports.default = Session;
//# sourceMappingURL=Session.js.map