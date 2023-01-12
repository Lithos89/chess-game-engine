"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var convertPosition_1 = require("../utils/position/convertPosition");
var Square = /** @class */ (function () {
    // constructor(position: Position | ShortPosition, color: SquareColor, initialPiece: Piece | null)
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
        this.color = color;
        this.setPiece(piece);
    }
    /*
      Possible cases to consider:
      1. Passing in an initialized piece
      2. Passing in the type of a piece and initializing it in the method of square
      3. Passing in the string of the piece and then through a switch statement initializing the appropriate piece, thereby removing all the imports scattered across the app
  
    */
    // TODO: This function still needs refinement to conform needs type support
    Square.prototype.setPiece = function (newPiece) {
        this.piece = newPiece;
        if (this.piece !== null) {
            this.piece.position = this.position;
            this.piece.updateLines();
        }
        this.abbrPiece = String(typeof newPiece);
    };
    ;
    return Square;
}());
;
exports.default = Square;
//# sourceMappingURL=Square.js.map