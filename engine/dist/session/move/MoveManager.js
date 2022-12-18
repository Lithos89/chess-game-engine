"use strict";
// Types, interfaces, constants, ...
// import { type ShortPosition } from '../../logic/Terms';
// import { BoardSquareListings } from '../../formation/structure/squareCollection';
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var MoveHistoryLL_1 = require("./MoveHistoryLL");
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
    function MoveManager(boardManager) {
        var _this = this;
        this.boardManager = boardManager;
        this.moveLL = new MoveHistoryLL_1.default();
        this.takebackMove = function () {
            _this.moveLL.removeLastMove();
            console.log(_this.moveLL.listMoves());
            // ?: Will also update the board with the new state reflecting the takeback
            // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
        };
        this.commitMove = function (origin, dest) {
            var originPiece = origin.piece;
            origin.piece = null;
            // destpiece will be used when it comes to reflecting captures
            var destPiece = dest.piece;
            dest.setPiece(originPiece);
            _this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
            console.log(_this.moveLL.listMoves());
            // TODO: Add some callback that will then update the client with the new board rather than returning like the primitive iteration
            _this.boardManager.notifyBoardUpdated();
        };
    }
    ;
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map