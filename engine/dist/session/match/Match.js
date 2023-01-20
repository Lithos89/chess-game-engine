"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
var GameController_1 = require("../game/GameController");
// State Management
var Observer_1 = require("../../state/Observer");
// *: Class that captures a series of games between an opponent
var Match = /** @class */ (function () {
    function Match(id, side) {
        var _this = this;
        this.games = [];
        this.gameCount = 0;
        this.selectedGameIndex = 0;
        // *: In the case of a tie, add 0.5 to each side
        this.wins = {
            player: 0,
            opponent: 0,
        };
        /*--------------------------------------------GAME MANAGEMENT---------------------------------------------*/
        this.startNewGame = function () {
            _this.gameGenerator.next();
            // this.signalState();
        };
        // TODO: Will need to change this to act like resigning (freezing the current game)
        this.resignGame = function () {
            // *: Give the victory to the opponent
            var _opponentSide = terms_1.SIDES[1 - terms_1.SIDES.indexOf(_this.currentSide)];
            _this.updateWins(_opponentSide);
            // ?: For now, resigning starts the next game.
            _this.startNewGame();
        };
        /*-----------------------------------------------MATCH INFO----------------------------------------------------*/
        this.getMatchStats = function () { return ({
            wins: _this.wins,
            currentSide: _this.currentSide,
            games: _this.games.length,
        }); };
        this.signalState = function (type) {
            switch (type) {
                case 'info': {
                    var matchInfo_1 = _this.getMatchStats();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { data: __assign(__assign({}, prevState.data), { info: matchInfo_1 }) })); });
                    break;
                }
                case 'current-game': {
                    var matchInfo_2 = _this.getMatchStats();
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { data: __assign(__assign({}, prevState.data), { info: matchInfo_2, currentGame: _this.currentGame.id }) })); });
                    break;
                }
                case 'controller': {
                    _this.observer.commitState(function (prevState) { return (__assign(__assign({}, prevState), { controller: {
                            newGame: _this.startNewGame,
                            resign: _this.resignGame,
                        } })); });
                    break;
                }
                default: {
                    var matchInfo_3 = _this.getMatchStats();
                    _this.observer.commitState(function (prevState) {
                        var _a;
                        return ({
                            data: __assign(__assign({}, (_a = prevState === null || prevState === void 0 ? void 0 : prevState.data) !== null && _a !== void 0 ? _a : []), { info: matchInfo_3 }),
                            controller: {
                                newGame: _this.startNewGame,
                                resign: _this.resignGame,
                            },
                        });
                    });
                    break;
                }
            }
            ;
        };
        this.id = id;
        this.gameGenerator = this.generateNextGame(side, id);
        this.observer = new Observer_1.default(this);
    }
    ;
    // TODO: Review the generator when it finished because I suspect that it doesn't behave correctly
    Match.prototype.generateNextGame = function (startingSide, id, matchLength) {
        var side, gameID, newGame, _nextSideIndex;
        if (matchLength === void 0) { matchLength = 100; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    side = startingSide;
                    _a.label = 1;
                case 1:
                    if (!(this.games.length < matchLength)) return [3 /*break*/, 3];
                    gameID = "".concat(id, "_").concat(side, "_").concat(this.gameCount);
                    newGame = new GameController_1.default(side, gameID);
                    this.storeGame(newGame);
                    return [4 /*yield*/, newGame];
                case 2:
                    _a.sent();
                    _nextSideIndex = (terms_1.SIDES.length - 1) - terms_1.SIDES.indexOf(side);
                    side = terms_1.SIDES[_nextSideIndex];
                    return [3 /*break*/, 1];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    };
    ;
    Match.prototype.storeGame = function (game) {
        // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
        this.currentGame = game;
        this.games.push(game);
        this.currentSide = game.playerSide;
        this.gameCount += 1;
        this.signalState('current-game');
    };
    ;
    Match.prototype.updateWins = function (result) {
        if (result === 'draw') {
            this.wins.player += 0.5;
            this.wins.opponent += 0.5;
        }
        else {
            var playerWon = result === this.currentSide;
            if (playerWon) {
                this.wins.player += 1;
            }
            else {
                this.wins.opponent += 1;
            }
            ;
        }
        ;
        this.signalState('info');
    };
    ;
    return Match;
}());
;
exports.default = Match;
//# sourceMappingURL=Match.js.map