"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexInRange = exports.flipFormation = exports.convertPosition = void 0;
// Types, interface, constants, ...
var terms_1 = require("../logic/terms");
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
function indexInRange(index, array) {
    return index >= 0 && index < array.length;
}
exports.indexInRange = indexInRange;
;
//# sourceMappingURL=index.js.map