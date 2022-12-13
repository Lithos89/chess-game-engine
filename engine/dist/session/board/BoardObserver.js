"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardObserver = /** @class */ (function () {
    function BoardObserver(boardManager, updateStateCallback) {
        var _this = this;
        this.setCallback = function (callback) {
            _this.updateState = callback;
            _this.boardManager.update();
        };
        this.update = function (stuff) {
            console.info("Board State Updated");
            // this.lastState = stuff
            _this.updateState(stuff);
        };
        this.boardManager = boardManager;
        this.updateState = updateStateCallback;
    }
    ;
    return BoardObserver;
}());
exports.default = BoardObserver;
//# sourceMappingURL=BoardObserver.js.map