"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardObserver = /** @class */ (function () {
    function BoardObserver(boardManager, updateStateCallback) {
        var _this = this;
        this.update = function () {
            _this.updateState(_this.boardManager.compileBoard);
        };
        this.boardManager = boardManager;
        this.updateState = updateStateCallback;
    }
    ;
    return BoardObserver;
}());
exports.default = BoardObserver;
//# sourceMappingURL=BoardObserver.js.map