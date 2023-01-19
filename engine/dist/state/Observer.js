"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Game Management
var Match_1 = require("../session/match/Match");
var Game_1 = require("../session/game/Game");
var Observer = /** @class */ (function () {
    function Observer(manager, setStateCallback) {
        if (setStateCallback === void 0) { setStateCallback = function () { }; }
        var _this = this;
        this.setCallback = function (setStateCallback) {
            _this.updateState = setStateCallback;
            _this.manager.signalState();
        };
        this.commitState = function (state) {
            if (_this.manager instanceof Match_1.default) {
                console.info("Match state updated");
            }
            else if (_this.manager instanceof Game_1.default) {
                console.info("Game state updated");
            }
            ;
            _this.updateState(state);
        };
        this.manager = manager;
        this.updateState = setStateCallback;
        if (manager instanceof Match_1.default) {
            Observer.matchObservers.set(manager.id, this);
        }
        else if (manager instanceof Game_1.default) {
            Observer.gameObservers.set(manager.id, this);
        }
        ;
    }
    ;
    // ?: Consider making these accessible by a id that is specified by a specific type
    Observer.gameObservers = new Map();
    Observer.matchObservers = new Map();
    return Observer;
}());
;
exports.default = Observer;
//# sourceMappingURL=Observer.js.map