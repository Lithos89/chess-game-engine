"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../../logic/terms");
var convertPosition_1 = require("../position/convertPosition");
function getBoardDirection(from, to, orientation) {
    from = typeof from === 'string' ? (0, convertPosition_1.default)(from) : from;
    to = typeof to === 'string' ? (0, convertPosition_1.default)(to) : to;
    // ? Consider condensing this function to not need the top level if statement
    if (orientation === 'horizontal') {
        var _fromCol = terms_1.COLUMNS.indexOf(from.col);
        var _toCol = terms_1.COLUMNS.indexOf(to.col);
        if (_toCol > _fromCol) {
            return '+';
        }
        else if (_toCol < _fromCol) {
            return '-';
        }
        else {
            // TODO: Include an error msg here
            throw Error();
        }
        ;
    }
    else {
        var _fromRow = terms_1.ROWS.indexOf(from.row);
        var _toRow = terms_1.ROWS.indexOf(to.row);
        if (_toRow > _fromRow) {
            return '+';
        }
        else if (_toRow < _fromRow) {
            return '-';
        }
        else {
            // TODO: Include an error msg here
            throw Error();
        }
        ;
    }
    ;
}
;
exports.default = getBoardDirection;
//# sourceMappingURL=getBoardDirection.js.map