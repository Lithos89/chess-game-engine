"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
;
exports.default = convertPosition;
//# sourceMappingURL=convertPosition.js.map