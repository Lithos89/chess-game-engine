"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../../logic/terms");
// Components
var Square_1 = require("../../../components/Square");
function calcDistance(square1, square2) {
    if (typeof square1 === 'string' && typeof square2 === 'string') {
        var col1 = terms_1.COLUMNS.indexOf(square1[0]);
        var row1 = terms_1.ROWS.indexOf(square1[1]);
        var col2 = terms_1.COLUMNS.indexOf(square2[0]);
        var row2 = terms_1.ROWS.indexOf(square2[1]);
        var dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
        return dist;
    }
    else if (square1 instanceof Square_1.default && square2 instanceof Square_1.default) {
        var col1 = terms_1.COLUMNS.indexOf(square1.position.col);
        var row1 = terms_1.ROWS.indexOf(square1.position.row);
        var col2 = terms_1.COLUMNS.indexOf(square2.position.col);
        var row2 = terms_1.ROWS.indexOf(square2.position.row);
        var dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
        return dist;
    }
    else if (typeof square1 === 'object' && typeof square2 === 'object' &&
        !(square1 instanceof Square_1.default) && !(square2 instanceof Square_1.default)) {
        var col1 = terms_1.COLUMNS.indexOf(square1.col);
        var row1 = terms_1.ROWS.indexOf(square1.row);
        var col2 = terms_1.COLUMNS.indexOf(square2.col);
        var row2 = terms_1.ROWS.indexOf(square2.row);
        var dist = Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
        return dist;
    }
    else {
        throw Error();
    }
    ;
}
;
exports.default = calcDistance;
//# sourceMappingURL=calcDistance.js.map