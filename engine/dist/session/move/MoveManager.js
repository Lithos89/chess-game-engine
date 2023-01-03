"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var terms_1 = require("../../logic/terms");
// Classes
var MoveHistoryLL_1 = require("./MoveHistoryLL");
// Util
var utils_1 = require("../../utils");
//*: Functions to include in this class
/*
  - Victory check
  - "Check" check
  - Draw check
    - 3 Repeated Move check
    - Insufficient Material Check
  ?: - Time check (if I decide to take the app this far)
*/
// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
var MoveManager = /** @class */ (function () {
    function MoveManager(updateState) {
        var _this = this;
        this.updateState = updateState;
        this.moveLL = new MoveHistoryLL_1.default();
        this.captures = {
            white: { p: 0, r: 0, h: 0, b: 0, q: 0 },
            black: { p: 0, r: 0, h: 0, b: 0, q: 0 },
        };
        this.takebackMove = function () {
            _this.moveLL.removeLastMove();
            console.info(_this.moveLL.listMoves());
            // ?: Will also update the board with the new state reflecting the takeback
            // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
        };
        this.getMoveHistory = function () {
            // !: Need to clean this up
            var tempList = _this.moveLL.listMoves().reverse().map(function (v, i, arr) {
                var isEven = i % 2 === 0;
                if (isEven) {
                    if (arr[i + 1] !== 'undefined') {
                        return [arr[i], arr[i + 1]];
                    }
                    else {
                        return [arr[i], ''];
                    }
                    ;
                }
                ;
            }).filter(function (v) { return v !== undefined; });
            return tempList;
        };
        this.capture = function (piece) {
            _this.captures[terms_1.SIDES[1 - terms_1.SIDES.indexOf(piece.side)]][piece.kind] += 1;
            _this.updateState('capture');
        };
        this.commitMove = function (origin, dest) {
            var originPiece = origin.piece;
            origin.piece = null;
            var destPiece = dest.piece;
            if (destPiece !== null)
                _this.capture(destPiece);
            _this.moveLL.addMove(originPiece.logMove((0, utils_1.convertPosition)(dest.position), !!destPiece));
            _this.updateState('move-log');
            if (originPiece.isMultiBehavioral() && originPiece.moved === false)
                originPiece.moved = true;
            dest.setPiece(originPiece);
            // this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
            // console.log(this.moveLL.listMoves());
            _this.updateState('board');
        };
    }
    ;
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map