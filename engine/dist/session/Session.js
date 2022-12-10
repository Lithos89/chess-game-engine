"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var Match_1 = require("./match/Match");
/*
  !: Overview of what needs to be done before further development
  TODO: 1. Get rid of the callback
  TODO: 2. Move starting a new game to Match
  TODO: 3. Implement an inteface or type for the match controller

/*
  *: session will be used so that broadcasts are appropriately handled
  *: session will allow for the scaling up of the app in the case of multiple opponents
*/
var Session = /** @class */ (function () {
    function Session(startingSide) {
        if (startingSide === void 0) { startingSide = 'white'; }
        var _this = this;
        this.matches = [];
        // ?: Could also add an 'opponent' parameter in the future (if players/different AI's become available)
        this.startNewMatch = function (playerSide) {
            if (playerSide === void 0) { playerSide = 'white'; }
            console.info("session");
            var match = new Match_1.default(playerSide);
            _this.matches.push(match);
            _this.updateCurrentMatch();
            console.log("hi: " + _this.matches.length);
            return { resignGame: _this.currentMatch.resignGame, startNewGame: _this.currentMatch.startNewGame, setObserver: _this.currentMatch.setObserver };
        };
        this.updateCurrentMatch = function (index) {
            if (index === void 0) { index = _this.matches.length - 1; }
            _this.currentMatch = _this.matches[index];
            // ?: If this function were being used to its full potential, would also need to update the match observer
        };
        // Start new match is only called on init because there is only one opponent
        // this.startNewMatch(startingSide);
    }
    ;
    return Session;
}());
;
exports.default = Session;
//# sourceMappingURL=Session.js.map