"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  This is the class that will be used to communicate with the move manager,
  therefore being able to seperate the move logic with the move callbacks
*/
var MoveController = /** @class */ (function () {
    function MoveController(boardPositions, commitMove, highlightBoard, takebackMove) {
        var _this = this;
        this.selectPiece = function (position) {
            var _a;
            var newSelectedPiece = (_a = _this.boardPositions[position]) === null || _a === void 0 ? void 0 : _a.piece;
            if (newSelectedPiece && newSelectedPiece !== _this.selectedPiece) {
                // Highlight board with the selected piece and keep track of the piece for 
                _this.highlightBoard(newSelectedPiece);
                _this.selectedPiece = newSelectedPiece;
            }
            else {
                // Unhighlight board and reset highlighted piece pointer
                _this.highlightBoard();
                _this.selectedPiece = null;
            }
        };
        this.requestMove = function (from, to) {
            var _a, _b;
            var originPiece = (_a = _this.boardPositions[from]) === null || _a === void 0 ? void 0 : _a.piece;
            // destpiece will be used when it comes to reflecting captures
            var destPiece = (_b = _this.boardPositions[to]) === null || _b === void 0 ? void 0 : _b.piece;
            try {
                if (from === to) {
                    throw Error;
                }
                // this.boardPositions[to].piece = originPiece;
                // this.boardPositions[from].piece = null;
                _this.commitMove(from, to);
            }
            catch (_c) {
                return false;
            }
            finally {
                // Here you will comit the move to the MoveManager using a commitMove method
                // this.commitMove()
                return true;
            }
            // TODO: Add filter functions here that will evaluate if it is a viable move
        };
        this.boardPositions = boardPositions;
        this.commitMove = commitMove;
        this.highlightBoard = highlightBoard;
        this.undo = takebackMove;
    }
    ;
    return MoveController;
}());
;
exports.default = MoveController;
//# sourceMappingURL=MoveController.js.map