"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexInRange = exports.sortPieces = exports.flipFormation = exports.convertPosition = void 0;
var lodash_1 = require("lodash");
// Types, interface, constants, ...
var terms_1 = require("../logic/terms");
// Components
var piece_1 = require("../components/piece");
// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
function convertPosition(position) {
    if (typeof position === 'string') {
        return { row: position[1], col: position[0] };
    }
    else if (typeof position === 'object') {
        return "".concat(position.col).concat(position.row);
    }
    else {
        throw Error('Unable to convert position of ' + position);
    }
    ;
}
exports.convertPosition = convertPosition;
;
// *: Flips a piece configuartion to match the opposite side of the board
function flipFormation(piecesFormation) {
    var altFormation = {};
    for (var pos in piecesFormation) {
        var piece = piecesFormation[pos];
        var newSide = terms_1.SIDES[1 - terms_1.SIDES.indexOf(piece.side)];
        altFormation[pos] = { kind: piece.kind, side: newSide };
    }
    ;
    return altFormation;
}
exports.flipFormation = flipFormation;
;
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
exports.sortPieces = sortPieces;
function indexInRange(index, array) {
    return index >= 0 && index < array.length;
}
exports.indexInRange = indexInRange;
;
//# sourceMappingURL=index.js.map