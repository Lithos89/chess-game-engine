"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square = /** @class */ (function () {
    function Square(position, color, piece) {
        if (typeof position === 'string') {
            this.pos = {
                row: position[1],
                col: position[0],
            };
        }
        else if (typeof position === 'object') {
            this.pos = position;
        }
        this.color = color;
        this.setPiece(piece);
    }
    Square.prototype.getPosition = function () {
        return this.pos.col + this.pos.row;
    };
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