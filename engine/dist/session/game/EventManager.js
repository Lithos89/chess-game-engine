"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Classes
var piece_1 = require("../../components/piece");
// Utils
var convertPosition_1 = require("../../utils/position/convertPosition");
;
var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    EventManager.forceCheckResolve = function (board, _a, side) {
        var attackPiece = _a.attackPiece, frontAttackLine = _a.frontAttackLine;
        var preventitiveMoves = [];
        var king;
        console.info(attackPiece);
        //* Blocking or capturing
        for (var boardPos in board) {
            var square = board[boardPos];
            var piece = square.piece;
            if ((0, lodash_1.isNull)(piece) || piece.side === side) {
                continue;
            }
            ;
            //* DEFENDING
            if (piece instanceof piece_1.King) {
                king = piece;
                continue;
            }
            ;
            var playableMoves = [];
            for (var _i = 0, _b = piece.availableMoves; _i < _b.length; _i++) {
                var move = _b[_i];
                // Block the attack line or capture the piece
                if (frontAttackLine.includes(move) || move === (0, convertPosition_1.default)(attackPiece.position)) {
                    preventitiveMoves.push(move);
                    playableMoves.push(move);
                }
                ;
            }
            ;
            piece.availableMoves = playableMoves;
        }
        var kingMoves = new Set(king.availableMoves);
        // Remove the positions that are still in the attacking piece's lines of attack
        if (attackPiece instanceof piece_1.Pawn)
            attackPiece.legalLines.flat(2).forEach(function (pos) { return kingMoves.delete(pos); });
        king.availableMoves = Array.from(kingMoves);
        return (0, lodash_1.isEmpty)(king.availableMoves) && (0, lodash_1.isEmpty)(preventitiveMoves);
    };
    ;
    EventManager.victoryCheck = function (board) {
    };
    return EventManager;
}());
;
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map