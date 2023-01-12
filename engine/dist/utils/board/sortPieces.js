"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Components
var piece_1 = require("../../components/piece");
function sortPieces(board) {
    var basicPieces = {
        white: [],
        black: []
    };
    var kings = {};
    for (var boardPos in board) {
        var square = board[boardPos];
        square.controlled = { white: false, black: false };
        var piece = square.piece;
        if ((0, lodash_1.isNull)(piece)) {
            continue;
        }
        ;
        if (piece instanceof piece_1.King) {
            if (piece.side === 'white')
                kings.white = piece;
            else if (piece.side === 'black') {
                kings.black = piece;
            }
            ;
        }
        else {
            if (piece.side === 'white')
                basicPieces.white.push(piece);
            else if (piece.side === 'black') {
                basicPieces.black.push(piece);
            }
            ;
        }
        ;
    }
    ;
    return [basicPieces, kings];
}
exports.default = sortPieces;
;
//# sourceMappingURL=sortPieces.js.map