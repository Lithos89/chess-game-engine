"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Movable from '../../match/move/interfaces/Movable';
// Components
// import Square from '../Square';
var Piece = /** @class */ (function () {
    function Piece(piece, side) {
        this.kind = piece;
        this.side = side;
    }
    ;
    Piece.prototype.getAvailablePositions = function () {
        var searchAlgorithms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searchAlgorithms[_i] = arguments[_i];
        }
        var availableMoves = [];
        for (var _a = 0, searchAlgorithms_1 = searchAlgorithms; _a < searchAlgorithms_1.length; _a++) {
            var algo = searchAlgorithms_1[_a];
            availableMoves.push.apply(availableMoves, algo(this.position));
        }
        ;
        return availableMoves;
    };
    ;
    return Piece;
}());
;
exports.default = Piece;
//# sourceMappingURL=Piece.js.map