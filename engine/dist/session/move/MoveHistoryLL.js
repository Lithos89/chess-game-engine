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
        // ?: Depending on if MoveHistoryLL still implements 'Move', then add removeLastTurn so that you can undo not only the last player move, but also the computer move
        // * I just realized that if the player is playing as the black pieces, then the move switch will be odd so I also need to account for that and can't just use the whole turn like I was doing before
        // removeLastTurn = () => {
        // };
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