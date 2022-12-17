"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flipFormation = exports.convertPosition = void 0;
// Types, interface, constants, ...
var Terms_1 = require("../logic/Terms");
// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
function convertPosition(rawPosition) {
    if (typeof rawPosition === 'string') {
        return { row: rawPosition[1], col: rawPosition[0] };
    }
    else if (typeof rawPosition === 'object') {
        return;
    }
    ;
}
exports.convertPosition = convertPosition;
;
function flipFormation(piecesFormation) {
    var flippedPieces = {};
    for (var pos in piecesFormation) {
        var piece = piecesFormation[pos];
        var newSide = Terms_1.SIDES[1 - Terms_1.SIDES.indexOf(piece.side)];
        flippedPieces[pos] = { kind: piece.kind, side: newSide };
    }
    ;
    return flippedPieces;
}
exports.flipFormation = flipFormation;
;
//# sourceMappingURL=index.js.map