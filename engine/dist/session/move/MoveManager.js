"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
var King_1 = require("../../components/piece/King");
var Pawn_1 = require("../../components/piece/Pawn");
// Classes
var MoveHistoryLL_1 = require("./MoveHistoryLL");
// Util
var convertPosition_1 = require("../../utils/regulation/position/convertPosition");
var calcDistance_1 = require("../../utils/regulation/position/calcDistance");
var getBoardDirection_1 = require("../../utils/regulation/direction/getBoardDirection");
var createPiece_1 = require("../../utils/piece/createPiece");
//*: Functions to include in this class
/*
  - Victory check
  - "Check" check
  - Draw check
    - 3 Repeated Move check
    - Insufficient Material Check
*/
// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
var MoveManager = /** @class */ (function () {
    function MoveManager(updateState, commitCastle) {
        var _this = this;
        this.updateState = updateState;
        this.commitCastle = commitCastle;
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
            var moveList = _this.moveLL.listMoves();
            var moveListAscending = moveList.reverse();
            // !: Need to clean this up
            var compiledMoves = moveListAscending.map(function (v, i, arr) {
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
            return compiledMoves;
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
            _this.moveLL.addMove(originPiece.logMove((0, convertPosition_1.default)(dest.position), !!destPiece));
            _this.updateState('move-log');
            if (originPiece.isMultiBehavioral() && originPiece.moved === false)
                originPiece.moved = true;
            if (originPiece instanceof King_1.default && (0, calcDistance_1.default)(origin, dest) > 1) {
                var castleDirection = (0, getBoardDirection_1.default)(origin.position, dest.position, "horizontal");
                dest.setPiece(originPiece);
                _this.commitCastle(originPiece, castleDirection);
            }
            else if (originPiece instanceof Pawn_1.default && ["1", "8"].includes(dest.position.row)) {
                var promotedPawn = (0, createPiece_1.default)(terms_1.PieceKind.Queen, originPiece.side);
                dest.setPiece(promotedPawn);
            }
            else {
                dest.setPiece(originPiece);
            }
            _this.updateState('board');
        };
    }
    ;
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map