"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var King_1 = require("../../components/piece/King");
var Pawn_1 = require("../../components/piece/Pawn");
// Utils
var convertPosition_1 = require("../../utils/regulation/position/convertPosition");
var calcDistance_1 = require("../../utils/regulation/position/calcDistance");
var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    EventManager.forceCheckResolve = function (board, _a, side) {
        var attackPiece = _a.attackPiece, frontAttackLine = _a.frontAttackLine;
        var preventitiveMoves = [];
        var king;
        //* Blocking or capturing
        for (var boardPos in board) {
            var square = board[boardPos];
            var piece = square.piece;
            if ((0, lodash_1.isNull)(piece) || piece.side === side) {
                continue;
            }
            ;
            //* DEFENDING
            if (piece instanceof King_1.default) {
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
        if (!(attackPiece instanceof Pawn_1.default)) {
            attackPiece.legalLines.flat(2).forEach(function (pos) {
                console.info(pos);
                kingMoves.delete(pos);
            });
        }
        //* Remove the ability for the king to castle out of the check
        for (var _c = 0, _d = king.legalLines.flat(2); _c < _d.length; _c++) {
            var pos = _d[_c];
            if ((0, calcDistance_1.default)(king.position, (0, convertPosition_1.default)(pos)) > 1) {
                kingMoves.delete(pos);
            }
        }
        king.availableMoves = Array.from(kingMoves);
        return (0, lodash_1.isEmpty)(king.availableMoves) && (0, lodash_1.isEmpty)(preventitiveMoves);
    };
    return EventManager;
}());
;
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map