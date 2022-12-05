"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var utils_1 = require("../../utils");
/*
  This is the class that will be used to communicate with the move manager,
  therefore being able to seperate the move logic with the move callbacks
*/
var MoveController = /** @class */ (function () {
    function MoveController(boardPositions, commitMove) {
        var _this = this;
        this.trackBackward = function () {
        };
        this.trackForward = function () {
        };
        this.requestMove = function (from, to) {
            var _a, _b;
            var originPiece = (_a = _this.boardPositions[from]) === null || _a === void 0 ? void 0 : _a.piece;
            // destpiece will be used when it comes to reflecting captures
            var destPiece = (_b = _this.boardPositions[to]) === null || _b === void 0 ? void 0 : _b.piece;
            try {
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
        this.moveRequestCallback = function (origin, dest) {
            var originPosShort = (0, utils_1.convertPosition)(origin.position);
            var destPosShort = (0, utils_1.convertPosition)(dest.position);
            var originPiece = origin.piece;
            // const destPiece = this.boardSquares[to]?.piece
            var goTo = _this.boardPositions['d4'];
            console.info(goTo);
            goTo.setPiece(originPiece);
            delete origin.piece;
            return _this.boardPositions;
        };
        this.boardPositions = boardPositions;
        this.commitMove = commitMove;
    }
    return MoveController;
}());
;
exports.default = MoveController;
//# sourceMappingURL=MoveController.js.map