"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFile = exports.tempDiagGen = void 0;
var lodash_1 = require("lodash");
// Types, interface, constants, ...
var Terms_1 = require("../Terms");
// const tempDiagGen = ({row, col}: Position): ShortPosition[][] => {
//   // NOTE: For now, I am going to treat the values from 0 - 7 since this is what I documented when I was constructing my algo and if I find that it is simpler after to just use 1-8 than then I will make the modification
//   const colIndex = COLUMNS.indexOf(col);
//   const rowIndex = ROWS.indexOf(row);
//   const col_positive = [];
//   for (let i = colIndex; i < COLUMNS.length; i++) {
//     const row_negative = [];
//     const row_positive = []; 
//     const rowVal = ROWS[i];
//     // colIndex++, rowIndex++
//     for (let j = rowIndex; j < ROWS.length; j++) {
//       const colVal = COLUMNS[j];
//       row_positive.push(`${colVal}${rowVal}`);
//     };
//     // colIndex++, rowIndex--
//     for (let j = rowIndex; j >= 0; j--) {
//       const colVal = COLUMNS[j];
//       row_negative.push(`${colVal}${rowVal}`);
//     };
//     col_positive.push(row_negative, row_positive);
//   };
//   const col_negative = [];
//   for (let i = colIndex; i >= 0; i--) {
//     const row_negative = [];  
//     const row_positive = []; 
//     const rowVal = ROWS[i];
//     // ColIndex--, rowIndex--
//     for (let j = rowIndex; j >= 0; j--) {
//       const colVal = COLUMNS[j];
//       row_negative.push(`${colVal}${rowVal}`);
//     };
//     // ColIndex--, rowIndex++ 
//     for (let j = rowIndex; j < ROWS.length; j++) {
//       const colVal = COLUMNS[j];
//       row_positive.push(`${colVal}${rowVal}`);
//     };
//     col_negative.push(row_negative, row_positive);
//   };
var tempDiagGen = function (max, direction) { return function (_a) {
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
    var diagonals = [];
    for (var _i = 0, rowSets_1 = rowSets; _i < rowSets_1.length; _i++) {
        var rowSet = rowSets_1[_i];
        var diagonalSection = [];
        for (var i in rowSet) {
            if (Number(i) >= max)
                break;
            var diagDist = Number(i) + 1;
            if (0 <= colIndex + diagDist && colIndex + diagDist < Terms_1.COLUMNS.length) {
                diagonalSection.push("".concat(Terms_1.COLUMNS[colIndex + diagDist]).concat(rowSet[i]));
            }
            ;
            if (0 <= colIndex - diagDist && colIndex - diagDist < Terms_1.COLUMNS.length) {
                diagonalSection.push("".concat(Terms_1.COLUMNS[colIndex - diagDist]).concat(rowSet[i]));
            }
            ;
        }
        diagonals.push(diagonalSection);
    }
    return diagonals.flat();
}; };
exports.tempDiagGen = tempDiagGen;
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
        return goodRows.flat().map(function (row) { return "".concat(col).concat(row); });
    }
    else {
        return goodRows.flatMap(function (fileSect) { return fileSect.filter(function (_, i) { return i < max; }); })
            .map(function (row) { return "".concat(col).concat(row); });
    }
    // return squaresFound;
}; };
exports.searchFile = searchFile;
//# sourceMappingURL=control.js.map