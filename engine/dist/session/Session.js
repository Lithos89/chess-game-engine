"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var terms_1 = require("../logic/terms");
// Game Management
var Match_1 = require("./match/Match");
/*
  * session will be used so that broadcasts are appropriately handled
  * session will allow for the scaling up of the app in the case of multiple opponents
*/
var Session = /** @class */ (function () {
    function Session() {
        var _this = this;
        this.matches = [];
        this.startNewMatch = function (mode, primarySide) {
            if (primarySide === void 0) { primarySide = 'white'; }
            var matchId = "match_".concat(_this.matches.length);
            var side = primarySide === 'random' ? terms_1.SIDES[Math.floor(Math.random() * 2)] : primarySide;
            var match = new Match_1.default(matchId, side, mode);
            _this.matches.push(match);
            _this.updateCurrentMatch();
            return match.id;
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