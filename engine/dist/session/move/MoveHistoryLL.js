"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Will see if I also incorporate move state
var MoveHistoryLL = /** @class */ (function () {
    function MoveHistoryLL() {
        var _this = this;
        this.head = null;
        this.addMove = function (value) {
            _this.head = new Move(value, _this.head);
        };
        this.removeLastMove = function () {
            if (_this.head !== null) {
                _this.head = _this.head.prevMove;
            }
            ;
        };
        this.listMoves = function () {
            var moveList = [];
            var _head = _this.head;
            while (_head !== null) {
                moveList.push(_head.log);
                _head = _head.prevMove;
            }
            ;
            return moveList;
        };
    }
    return MoveHistoryLL;
}());
exports.default = MoveHistoryLL;
;
var Move = /** @class */ (function () {
    function Move(moveLog, prev) {
        if (prev === void 0) { prev = null; }
        this.log = moveLog;
        this.prevMove = prev;
    }
    ;
    return Move;
}());
;
//# sourceMappingURL=MoveHistoryLL.js.map