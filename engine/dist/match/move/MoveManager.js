"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../components/pieces/index");
// Classes
var MoveController_1 = require("./MoveController");
// utils
var utils_1 = require("../../utils");
// *: The purpose of MoveController will be to keep track of available moves, forced plays, signal someone has won, and more...
var MoveManager = /** @class */ (function () {
    function MoveManager(squareListing) {
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
            var originPosShort = (0, utils_1.convertPosition)(origin.position);
            var destPosShort = (0, utils_1.convertPosition)(dest.position);
            var originPiece = origin.piece;
            // const destPiece = this.boardSquares[to]?.piece
            var goTo = _this.boardSquares['d4'];
            console.info(goTo);
            goTo.setPiece(originPiece);
            delete origin.piece;
            return _this.boardSquares;
        };
        this.boardSquares = squareListing;
        this.controller = new MoveController_1.default(this.boardSquares);
        index_1.default.movePiece = this.moveRequestCallback;
    }
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map