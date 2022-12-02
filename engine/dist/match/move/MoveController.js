"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../components/pieces/index");
// *: The purpose of MoveController will be to keep track of available moves, forced plays, signal someone has won, and more...
var MoveController = /** @class */ (function () {
    function MoveController(squareListing) {
        var _this = this;
        // !: Make sure to make these run at the same time because the piece could be added to the original, and not yet be deleted from the original,
        // !: leading to a duplication glitch
        this.requestMove = function (from, to) {
            var _a;
            var originPiece = (_a = _this.boardSquares[from]) === null || _a === void 0 ? void 0 : _a.piece;
            // const destPiece = this.boardSquares[to]?.piece
            _this.boardSquares[to].piece = originPiece;
            delete _this.boardSquares[from].piece;
            // TODO: Add filter functions here that will evaluate if it is a viable move
        };
        this.moveRequestCallback = function (origin, dest) {
            var originPosShort = "".concat(origin.pos.col).concat(origin.pos.row);
            var destPosShort = "".concat(dest.pos.col).concat(dest.pos.row);
            // const destPosShort: ShortPosition = `${dest.pos.col}${dest.pos.row}`;
            // const destPosShort = 'd4';
            // this.requestMove(originPosShort, destPosShort);
            var originPiece = origin.piece;
            // const destPiece = this.boardSquares[to]?.piece
            dest.setPiece(originPiece);
            delete origin.piece;
        };
        this.boardSquares = squareListing;
        index_1.default.movePiece = this.moveRequestCallback;
    }
    return MoveController;
}());
exports.default = MoveController;
;
//# sourceMappingURL=MoveController.js.map