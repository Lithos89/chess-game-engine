"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interface, constants, ...
var terms_1 = require("../../logic/terms");
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
exports.default = flipFormation;
;
//# sourceMappingURL=flipFormation.js.map