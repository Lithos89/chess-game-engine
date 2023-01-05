"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
var utils_1 = require("../../utils");
;
var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    EventManager.forceCheckResolve = function (board, _a, side) {
        var attackPiece = _a.attackPiece, frontAttackLine = _a.frontAttackLine, fullAttackLine = _a.fullAttackLine;
        var _boardCopy = board;
        var controlledSquares = new Set();
        var otherMoves = [];
        var king;
        //* Blocking or capturing
        for (var boardPos in board) {
            var square = board[boardPos];
            var piece = square.piece;
            if ((0, lodash_1.isNull)(piece)) {
                continue;
            }
            ;
            if (piece.side !== side) {
                // ATTACKING
                for (var _i = 0, _b = piece.availableMoves; _i < _b.length; _i++) {
                    var move = _b[_i];
                    controlledSquares.add(move);
                }
                ;
            }
            else {
                // DEFENDING
                if (piece.kind === terms_1.PieceKind.King) {
                    king = piece;
                    continue;
                }
                var playableMoves = [];
                for (var _c = 0, _d = piece.availableMoves; _c < _d.length; _c++) {
                    var move = _d[_c];
                    // Block the attack line or capture the piece
                    if (frontAttackLine.includes(move) || move === (0, utils_1.convertPosition)(attackPiece.position)) {
                        playableMoves.push(move);
                    }
                    ;
                }
                ;
                piece.availableMoves = playableMoves;
                otherMoves.push.apply(otherMoves, playableMoves);
            }
        }
        var kingMoves = new Set(king.availableMoves);
        controlledSquares.forEach(function (pos) { return kingMoves.delete(pos); });
        fullAttackLine.forEach(function (pos) { return kingMoves.delete(pos); });
        // kingMoves.delete(controlledSquares.values())
        king.availableMoves = Array.from(kingMoves);
        return (0, lodash_1.isEmpty)(king.availableMoves) && (0, lodash_1.isEmpty)(otherMoves);
    };
    ;
    EventManager.victoryCheck = function (board) {
    };
    return EventManager;
}());
;
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map