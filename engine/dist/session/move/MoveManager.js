"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var MoveController_1 = require("./MoveController");
var MoveHistoryLL_1 = require("./MoveHistoryLL");
// !: Worth looking into the relationships of MoveManager for bugs
// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
var MoveManager = /** @class */ (function () {
    // 
    function MoveManager(squareListing, boardUpdateCallback, highlightBoard) {
        var _this = this;
        // Functions to include in this class
        /*
          - Victory check
          - "Check" check
          - Draw check
            - 3 Repeated Move check
            - Insufficient Material Check
          ?: - Time check (if I decide to take the app this far)
        */
        this.takebackMove = function () {
            _this.moveLL.removeLastMove();
            console.log(_this.moveLL.listMoves());
            // ?: Will also update the board with the new state reflecting the takeback
            // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
        };
        this.commitMove = function (from, to) {
            var originSquare = _this.boardSquares[from];
            var destSquare = _this.boardSquares[to];
            var originPiece = originSquare === null || originSquare === void 0 ? void 0 : originSquare.piece;
            originSquare.piece = null;
            // destpiece will be used when it comes to reflecting captures
            var destPiece = destSquare === null || destSquare === void 0 ? void 0 : destSquare.piece;
            destSquare.setPiece(originPiece);
            _this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
            console.log(_this.moveLL.listMoves());
            // TODO: Add some callback that will then update the client with the new board rather than returning like the primitive iteration
            _this.updateBoard();
        };
        this.updateBoard = boardUpdateCallback;
        this.boardSquares = squareListing;
        this.moveLL = new MoveHistoryLL_1.default();
        // !: Need to figure out a better way of passing these callbacks
        this.controller = new MoveController_1.default(this.boardSquares, this.commitMove, highlightBoard, this.takebackMove);
    }
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map