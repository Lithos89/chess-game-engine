"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interface, constants, ...
var Terms_1 = require("../Terms");
var searchDiagonals = function (max, direction) { return function (_a) {
    // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification
    var row = _a.row, col = _a.col;
    var colIndex = Terms_1.COLUMNS.indexOf(col);
    var rowIndex = Terms_1.ROWS.indexOf(row);
    var rowSets;
    if (direction === '+') {
        rowSets = [Terms_1.ROWS.slice(rowIndex + 1)];
    }
    else if (direction === '-') {
        rowSets = [Terms_1.ROWS.slice(0, rowIndex).reverse()];
    }
    else {
        rowSets = [Terms_1.ROWS.slice(0, rowIndex).reverse(), Terms_1.ROWS.slice(rowIndex + 1)];
    }
    var diagonalSects = [];
    for (var _i = 0, rowSets_1 = rowSets; _i < rowSets_1.length; _i++) {
        var rowSet = rowSets_1[_i];
        var diagonalSection = [];
        var diagonalSection1 = [];
        var diagonalSection2 = [];
        for (var i in rowSet) {
            var distance = Number(i) + 1;
            if (distance > max)
                break;
            // Side 1
            if (0 <= colIndex + distance && colIndex + distance < Terms_1.COLUMNS.length) {
                diagonalSection1.push("".concat(Terms_1.COLUMNS[colIndex + distance]).concat(rowSet[i]));
            }
            ;
            // Side 2
            if (0 <= colIndex - distance && colIndex - distance < Terms_1.COLUMNS.length) {
                diagonalSection2.push("".concat(Terms_1.COLUMNS[colIndex - distance]).concat(rowSet[i]));
            }
            ;
        }
        ;
        diagonalSects.push(diagonalSection1, diagonalSection2);
    }
    ;
    return diagonalSects;
}; };
// function * diag(max: number | undefined, direction?: '+' | '-') {
//   const {row, col}: Position = yield;
// }
var searchFile = function (max, direction) { return function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    var goodRows;
    var _row = Terms_1.ROWS.indexOf(row);
    if (direction === '+') {
        goodRows = [Terms_1.ROWS.slice(_row + 1)];
    }
    else if (direction === '-') {
        goodRows = [Terms_1.ROWS.slice(0, _row).reverse()];
    }
    else {
        goodRows = [Terms_1.ROWS.slice(0, _row).reverse(), Terms_1.ROWS.slice(_row + 1)];
    }
    ;
    if ((0, lodash_1.isUndefined)(max)) {
        return goodRows.map(function (v) { return v.map(function (row) { return "".concat(col).concat(row); }); });
    }
    else {
        return goodRows.map(function (v) { return v.filter(function (_, i) { return i < max; })
            .map(function (row) { return "".concat(col).concat(row); }); });
    }
    ;
}; };
var searchRank = function (max, direction) { return function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    var goodColumns;
    var _col = Terms_1.COLUMNS.indexOf(col);
    if (direction === '+') {
        goodColumns = [Terms_1.COLUMNS.slice(_col + 1)];
    }
    else if (direction === '-') {
        goodColumns = [Terms_1.COLUMNS.slice(0, _col).reverse()];
    }
    else {
        goodColumns = [Terms_1.COLUMNS.slice(0, _col).reverse(), Terms_1.COLUMNS.slice(_col + 1)];
    }
    ;
    if ((0, lodash_1.isUndefined)(max)) {
        return goodColumns.map(function (v) { return v.map(function (col) { return "".concat(col).concat(row); }); });
    }
    else {
        return goodColumns.map(function (v) { return v.filter(function (_, i) { return i < max; })
            .map(function (col) { return "".concat(col).concat(row); }); });
    }
    ;
}; };
var searchLs = function (_a) {
    var row = _a.row, col = _a.col;
    var squaresFound = [];
    var colIndex = Terms_1.COLUMNS.indexOf(col);
    var rowIndex = Terms_1.ROWS.indexOf(row);
    // col + 2, row +- 1
    // col - 2, row +- 1
    // row + 2, col +- 1
    // row - 2, col +-1
    var row_col = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [-1, -2], [1, -2]];
    for (var _i = 0, row_col_1 = row_col; _i < row_col_1.length; _i++) {
        var _b = row_col_1[_i], _row = _b[0], _col = _b[1];
        var newRow = rowIndex + _row;
        var newCol = colIndex + _col;
        if (newRow >= 0 && newRow < Terms_1.ROWS.length) {
            if (newCol >= 0 && newCol < Terms_1.COLUMNS.length) {
                squaresFound.push("".concat(Terms_1.COLUMNS[newCol]).concat(Terms_1.ROWS[newRow]));
            }
            ;
        }
        ;
    }
    ;
    return squaresFound.map(function (v) { return [v]; });
};
var Search = {
    diagonals: searchDiagonals,
    file: searchFile,
    rank: searchRank,
    Ls: searchLs,
};
exports.default = Search;
//# sourceMappingURL=core.js.map