"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var Game_1 = require("./game/Game");
// *: Class that captures a series of games between an opponent
var Match = /** @class */ (function () {
    function Match(side) {
        var _this = this;
        this.games = [];
        this.selectedGameIndex = 0;
        // Add here a property that takes the squares from the current games move cntroller
        this.gameCount = 0;
        // *: In the case of a tie, add 0.5 to each side
        this.wins = {
            player: 0,
            computer: 0
        };
        this.resetGame = function () {
            _this.currentGame = _this.gameGenerator.next().value;
            // console.log('new')
            console.log(_this.currentGame.id);
            // this.currentGame = new Game('white')
            return _this.currentGame.boardController.boardSquares;
        };
        this.gameGenerator = this.generateNextGame(side, 'test');
        // !: Fix this type conversion to something better
        var newGame = this.gameGenerator.next().value;
        this.games.push(newGame);
        this.currentGame = newGame;
        this.currentSide = side;
        this.gameCount += 1;
    }
    Match.prototype.storeGame = function (game) {
        this.games.push(game);
        this.gameCount += 1;
    };
    Match.prototype.generateNextGame = function (startingSide, id) {
        var tempID, newGame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempID = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    newGame = new Game_1.Game(startingSide, tempID.toString());
                    this.storeGame(newGame);
                    return [4 /*yield*/, new Game_1.Game(startingSide, tempID.toString())];
                case 2:
                    _a.sent();
                    tempID += 1;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    Match.prototype.updateWins = function (result) {
        // !: Need to update this to look at the side of the player and the computer and update the appropriate win section
        switch (result) {
            case ('white'):
                this.wins.white++;
                break;
            case ('black'):
                this.wins.black++;
                break;
            case ('draw'):
                this.wins.white += 0.5;
                this.wins.black += 0.5;
        }
    };
    return Match;
}());
exports.default = Match;
;
//# sourceMappingURL=Match.js.map