"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPosition = void 0;
// *: Function to convert between the alternate forms of board positions ({row, col} or `${col}${row}`)
function convertPosition(rawPosition) {
    if (typeof rawPosition === 'string') {
        return { row: rawPosition[1], col: rawPosition[0] };
    }
    else if (typeof rawPosition === 'object') {
        return;
    }
}
exports.convertPosition = convertPosition;
//# sourceMappingURL=index.js.map