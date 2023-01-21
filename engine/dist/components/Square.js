"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var convertPosition_1 = require("../utils/regulation/position/convertPosition");
var Square = /** @class */ (function () {
    function Square(position, color, piece) {
        if (piece === void 0) { piece = null; }
        this.controlled = {
            white: false,
            black: false,
        };
        if (typeof position === 'string')
            this.position = (0, convertPosition_1.default)(position);
        else if (typeof position === 'object')
            this.position = position;
        else
            throw Error("Improper position format provided to square");
        this.color = color;
        this.setPiece(piece);
    }
    ;
    // TODO: This function still needs refinement to conform needs type support
    Square.prototype.setPiece = function (piece) {
        this.piece = piece;
        if (this.piece !== null) {
            this.piece.position = this.position;
            this.piece.updateLines();
        }
        ;
    };
    ;
    Square.prototype.removePiece = function () {
        this.piece = null;
    };
    ;
    return Square;
}());
;
exports.default = Square;
//# sourceMappingURL=Square.js.map