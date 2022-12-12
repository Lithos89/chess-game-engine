"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var Match_1 = require("./match/Match");
/*
  !: Overview of what needs to be done before further development
  // TODO: 1. Get rid of the callback
  // TODO: 2. Move starting a new game to Match
  TODO: 3. Implement an interface or type for the match controller

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
        this.updateCurrentMatch = function (index) {
            if (index === void 0) { index = _this.matches.length - 1; }
            _this.currentMatch = _this.matches[index];
            // !: Add in here a call to update the current match observer
            // ?: If this function were being used to its full potential, would also need to update the match observer
        };
        this.getCurrentMatch = function () {
            if (_this.currentMatch) {
                return _this.currentMatch;
            }
            ;
        };
        Session.getCurrentSession = function () { return _this; };
    }
    ;
    return Session;
}());
;
exports.default = Session;
//# sourceMappingURL=Session.js.map