"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interface, constants, ...
var Terms_1 = require("../Terms");
var searchFile = function (bidirectional) { return function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    for (var _i = 0, ROWS_1 = Terms_1.ROWS; _i < ROWS_1.length; _i++) {
        var rank = ROWS_1[_i];
        if (rank === row || (!bidirectional && rank < row)) {
            continue;
        }
        else {
            squaresFound.push("".concat(col).concat(rank));
        }
    }
    ;
    return squaresFound;
}; };
var searchRank = function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    for (var _i = 0, COLUMNS_1 = Terms_1.COLUMNS; _i < COLUMNS_1.length; _i++) {
        var file = COLUMNS_1[_i];
        if (file === col) {
            continue;
        }
        else {
            squaresFound.push("".concat(file).concat(row));
        }
    }
    ;
    return squaresFound;
};
// TODO: Analyze the algorithm and see if I can clean up the math into a simpler formula
var searchDiagonals = function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification
    var colIndex = Terms_1.COLUMNS.indexOf(col);
    var rowIndex = Terms_1.ROWS.indexOf(row);
    for (var i in Terms_1.ROWS) {
        for (var j in Terms_1.COLUMNS) {
            var rowVal = Terms_1.ROWS[i];
            var colVal = Terms_1.COLUMNS[j];
            if ((rowVal !== row && colVal !== col) && (rowIndex + colIndex === Number(i) + Number(j) || colIndex - rowIndex === Number(j) - Number(i)))
                squaresFound.push("".concat(colVal).concat(rowVal));
        }
    }
    return squaresFound;
};
// TODO: Update this algorithm with the appropriate logic
var searchLs = function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification
    var colIndex = Terms_1.COLUMNS.indexOf(col);
    var rowIndex = Terms_1.ROWS.indexOf(row);
    for (var i in Terms_1.ROWS) {
        for (var j in Terms_1.COLUMNS) {
            var rowVal = Terms_1.ROWS[i];
            var colVal = Terms_1.COLUMNS[j];
            if ((rowVal !== row && colVal !== col) && (rowIndex + colIndex === Number(i) + Number(j) || colIndex - rowIndex === Number(j) - Number(i)))
                squaresFound.push("".concat(colVal).concat(rowVal));
        }
    }
    return squaresFound;
};
var search = {
    file: searchFile,
    rank: searchRank,
    diagonals: searchDiagonals,
    Ls: searchLs,
};
exports.default = search;
//# sourceMappingURL=movement.js.map