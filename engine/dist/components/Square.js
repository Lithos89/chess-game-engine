"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Util
var utils_1 = require("utils");
var Square = /** @class */ (function () {
    function Square(position, color, piece) {
        if (typeof position === 'string') {
            this.position = (0, utils_1.convertPosition)(position);
        }
        else if (typeof position === 'object') {
            this.position = position;
        }
        this.color = color;
        this.setPiece(piece);
    }
    Square.prototype.getPosition = function () {
        return (0, utils_1.convertPosition)(this.position);
    };
    ;
    /*
      Possible cases to consider:
      1. Passing in an initialized piece
      2. Passing in the type of a piece and initializing it in the method of square
      3. Passing in the string of the piece and then through a switch statement initializing the appropriate piece, thereby removing all the imports scattered across the app
  
    */
    Square.prototype.setPiece = function (newPiece) {
        this.piece = newPiece;
        this.abbrPiece = String(typeof newPiece);
    };
    return Square;
}());
exports.default = Square;
;
//# sourceMappingURL=Square.js.map