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
var BoardManager_1 = require("../board/BoardManager");
var Terms_1 = require("../../logic/Terms");
// Classes
var Game_1 = require("../game/Game");
var MatchObserver_1 = require("./MatchObserver");
// *: Class that captures a series of games between an opponent
var Match = /** @class */ (function () {
    function Match(side) {
        var _this = this;
        this.games = [];
        this.selectedGameIndex = 0;
        // !:be able to scope it in the generator so that way different actions like resign have access to the callback
        // Add here a property that takes the squares from the current games move cntroller
        this.gameCount = 0;
        // *: In the case of a tie, add 0.5 to each side
        this.wins = {
            player: 0,
            opponent: 0
        };
        this.startNewGame = function (updateBoardStateCallback) {
            var newGame = _this.gameGenerator.next().value;
            var boardManager = new BoardManager_1.default(newGame, updateBoardStateCallback);
            var moveController = boardManager.moveManager.controller;
            // TODO: Set this is as the type of GameController which I will create or do something along these lines
            var move = moveController.requestMove, select = moveController.selectPiece, undo = moveController.undo;
            _this.tempfunc = updateBoardStateCallback;
            _this.observer.update();
            return { move: move, select: select, undo: undo };
        };
        this.getMatchStats = function () {
            return ({
                wins: _this.wins,
                currentSide: _this.currentSide,
                games: _this.games.length,
            });
        };
        // !: Will need to change this to act like resigning
        this.resignGame = function () {
            // *: Give the victory to the opponent
            var _opponentSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(_this.currentSide)];
            _this.updateWins(_opponentSide);
            var newGame = _this.startNewGame(_this.tempfunc);
            // this.currentGame = new Game('white')
            _this.observer.update();
            return newGame;
        };
        this.setObserver = function (updateMatchStateCallback) {
            _this.observer = new MatchObserver_1.default(_this, updateMatchStateCallback);
        };
        this.gameGenerator = this.generateNextGame(side, 'test');
    }
    ;
    Match.prototype.storeGame = function (game) {
        this.games.push(game);
        // *: Assumes you want to go to the game that you are storing (a.k.a creating) 
        this.currentGame = game;
        this.currentSide = game.playerSide;
        this.gameCount += 1;
        console.log(this.currentGame.id);
    };
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
                    newGame = new Game_1.Game(side, gameID);
                    return [4 /*yield*/, newGame];
                case 2:
                    _a.sent();
                    this.storeGame(newGame);
                    _nextSideIndex = (Terms_1.SIDES.length - 1) - Terms_1.SIDES.indexOf(side);
                    side = Terms_1.SIDES[_nextSideIndex];
                    return [3 /*break*/, 1];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    };
    ;
    Match.prototype.getGame = function (index) {
        return this.games[index];
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
    };
    ;
    return Match;
}());
exports.default = Match;
;
//# sourceMappingURL=Match.js.map