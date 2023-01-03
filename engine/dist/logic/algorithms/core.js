"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interface, constants, ...
var terms_1 = require("../terms");
// Utils
var utils_1 = require("../../utils");
var searchDiagonals = function (max, direction) { return function (_a) {
    var row = _a.row, col = _a.col;
    if (max !== undefined && max < 1) {
        throw Error("Invalid max parameter, please provide only natural numbers");
    }
    ;
    var colIndex = terms_1.COLUMNS.indexOf(col);
    var rowIndex = terms_1.ROWS.indexOf(row);
    var rowSets; // 1 or 2 sets of rows from current row to first or last row on board
    if (direction === '+') {
        rowSets = [terms_1.ROWS.slice(rowIndex + 1)];
    }
    else if (direction === '-') {
        rowSets = [terms_1.ROWS.slice(0, rowIndex).reverse()];
    }
    else {
        rowSets = [terms_1.ROWS.slice(0, rowIndex).reverse(), terms_1.ROWS.slice(rowIndex + 1)];
    }
    ;
    var diagonalLines = [];
    // Get diagonal for each SELECTED vertical portion of the board
    for (var _i = 0, rowSets_1 = rowSets; _i < rowSets_1.length; _i++) {
        var rowSet = rowSets_1[_i];
        var upperDiagonal = [];
        var lowerDiagonal = [];
        var distance = 1;
        while (distance <= rowSet.length && (max === undefined || distance <= max)) {
            var i = distance - 1;
            // Upper Horizontal of Board
            if ((0, utils_1.indexInRange)(colIndex + distance, terms_1.COLUMNS))
                upperDiagonal.push("".concat(terms_1.COLUMNS[colIndex + distance]).concat(rowSet[i]));
            // Lower Horizontal of Board
            if ((0, utils_1.indexInRange)(colIndex - distance, terms_1.COLUMNS))
                lowerDiagonal.push("".concat(terms_1.COLUMNS[colIndex - distance]).concat(rowSet[i]));
            distance += 1;
        }
        ;
        diagonalLines.push(upperDiagonal, lowerDiagonal);
    }
    ;
    return diagonalLines;
}; };
var searchFile = function (max, direction) { return function (_a) {
    var row = _a.row, col = _a.col;
    var verticalLines = [];
    var rowIndex = terms_1.ROWS.indexOf(row);
    var rowSets;
    if (direction === '+') {
        rowSets = [terms_1.ROWS.slice(rowIndex + 1)];
    }
    else if (direction === '-') {
        rowSets = [terms_1.ROWS.slice(0, rowIndex).reverse()];
    }
    else {
        rowSets = [terms_1.ROWS.slice(0, rowIndex).reverse(), terms_1.ROWS.slice(rowIndex + 1)];
    }
    ;
    if ((0, lodash_1.isUndefined)(max)) {
        for (var _i = 0, rowSets_2 = rowSets; _i < rowSets_2.length; _i++) {
            var rowSet = rowSets_2[_i];
            var fileLine = [];
            for (var _b = 0, rowSet_1 = rowSet; _b < rowSet_1.length; _b++) {
                var _row = rowSet_1[_b];
                fileLine.push("".concat(col).concat(_row));
            }
            ;
            verticalLines.push(fileLine);
        }
        ;
    }
    else {
        for (var _c = 0, rowSets_3 = rowSets; _c < rowSets_3.length; _c++) {
            var rowSet = rowSets_3[_c];
            var fileLine = [];
            var truncatedRowSet = rowSet.slice(0, max);
            for (var _d = 0, truncatedRowSet_1 = truncatedRowSet; _d < truncatedRowSet_1.length; _d++) {
                var _row = truncatedRowSet_1[_d];
                fileLine.push("".concat(col).concat(_row));
            }
            ;
            verticalLines.push(fileLine);
        }
        ;
    }
    ;
    return verticalLines;
}; };
var searchRank = function (max, direction) { return function (_a) {
    var row = _a.row, col = _a.col;
    var horizontalLines = [];
    var colIndex = terms_1.COLUMNS.indexOf(col);
    var colSets;
    if (direction === '+') {
        colSets = [terms_1.COLUMNS.slice(colIndex + 1)];
    }
    else if (direction === '-') {
        colSets = [terms_1.COLUMNS.slice(0, colIndex).reverse()];
    }
    else {
        colSets = [terms_1.COLUMNS.slice(0, colIndex).reverse(), terms_1.COLUMNS.slice(colIndex + 1)];
    }
    ;
    if ((0, lodash_1.isUndefined)(max)) {
        for (var _i = 0, colSets_1 = colSets; _i < colSets_1.length; _i++) {
            var colSet = colSets_1[_i];
            var rankLine = [];
            for (var _b = 0, colSet_1 = colSet; _b < colSet_1.length; _b++) {
                var _col = colSet_1[_b];
                rankLine.push("".concat(_col).concat(row));
            }
            ;
            horizontalLines.push(rankLine);
        }
        ;
    }
    else {
        for (var _c = 0, colSets_2 = colSets; _c < colSets_2.length; _c++) {
            var colSet = colSets_2[_c];
            var rankLine = [];
            var truncatedColSet = colSet.slice(0, max);
            for (var _d = 0, truncatedColSet_1 = truncatedColSet; _d < truncatedColSet_1.length; _d++) {
                var _col = truncatedColSet_1[_d];
                rankLine.push("".concat(_col).concat(row));
            }
            ;
            horizontalLines.push(rankLine);
        }
        ;
    }
    ;
    return horizontalLines;
}; };
var searchLs = function () { return function (_a) {
    var row = _a.row, col = _a.col;
    //* T meaning translation in this context
    var squaresFound = [];
    var colIndex = terms_1.COLUMNS.indexOf(col);
    var rowIndex = terms_1.ROWS.indexOf(row);
    // [row, col] L translation vectors
    var translations = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [-1, -2], [1, -2]];
    // pos indices + translations (broadcasted)
    var posT = translations.map(function (T) { return [rowIndex + T[0], colIndex + T[1]]; });
    for (var _i = 0, posT_1 = posT; _i < posT_1.length; _i++) {
        var _b = posT_1[_i], rowT = _b[0], colT = _b[1];
        if ((0, utils_1.indexInRange)(rowT, terms_1.ROWS) && (0, utils_1.indexInRange)(colT, terms_1.COLUMNS)) {
            var rowPrime = terms_1.ROWS[rowT];
            var colPrime = terms_1.COLUMNS[colT];
            squaresFound.push("".concat(colPrime).concat(rowPrime));
        }
        ;
    }
    ;
    // Convert to 2-dimensional array to match other algorithm outputs
    return squaresFound.map(function (v) { return [v]; });
}; };
var Search = {
    diagonals: searchDiagonals,
    file: searchFile,
    rank: searchRank,
    Ls: searchLs,
};
exports.default = Search;
//# sourceMappingURL=core.js.map