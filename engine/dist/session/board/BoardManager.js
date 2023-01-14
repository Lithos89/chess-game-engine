"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var Square_1 = require("../../components/Square");
// import Piece, { Rook, Knight, Queen, Bishop, King, Pawn } from '../../components/piece';
var Piece_1 = require("../../components/piece/Piece");
var King_1 = require("../../components/piece/King");
var Rook_1 = require("../../components/piece/Rook");
var Knight_1 = require("../../components/piece/Knight");
var Bishop_1 = require("../../components/piece/Bishop");
var Queen_1 = require("../../components/piece/Queen");
var Pawn_1 = require("../../components/piece/Pawn");
// Utils
var convertPosition_1 = require("../../utils/position/convertPosition");
var flipFormation_1 = require("../../utils/board/flipFormation");
var sortPieces_1 = require("../../utils/board/sortPieces");
;
var BoardManager = /** @class */ (function () {
    function BoardManager(startingFormation, alt, currentTurnSideCallback, updateState) {
        var _this = this;
        this.updateState = updateState;
        this.boardSquares = {};
        this.squareHighlighting = {};
        /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/
        // TODO: Fix the paramters so that it tracks the different highlighted action type
        this.compileBoard = function () {
            var processedBoard = [];
            for (var position in _this.boardSquares) {
                processedBoard.push({
                    position: position,
                    square: {
                        color: _this.boardSquares[position].color,
                        focus: (position in _this.squareHighlighting) ?
                            _this.squareHighlighting[position] :
                            { highlighted: false, action: null },
                    },
                    piece: _this.boardSquares[position].piece ?
                        {
                            kind: _this.boardSquares[position].piece.kind,
                            side: _this.boardSquares[position].piece.side,
                        } : null
                });
            }
            ;
            return processedBoard;
        };
        /*--------------------------------------------HIGHLIGHTING---------------------------------------------*/
        this.highlightMoves = function (piece) {
            var _a;
            if (piece instanceof Piece_1.default) {
                if (piece.side === _this.getCurrentTurnSide()) {
                    //* Highlighting the available moves of the piece
                    for (var _i = 0, _b = piece.availableMoves; _i < _b.length; _i++) {
                        var pos = _b[_i];
                        _this.squareHighlighting[pos] = {
                            highlighted: true,
                            action: (0, lodash_1.isNull)((_a = _this.boardSquares[pos]) === null || _a === void 0 ? void 0 : _a.piece) ? "move" : "capture",
                        };
                    }
                    ;
                    //* Highlighting the piece (using 'null' for now but may change)
                    _this.squareHighlighting[(0, convertPosition_1.default)(piece.position)] = {
                        highlighted: true,
                        action: null,
                    };
                    _this.updateState();
                }
                ;
            }
            else {
                _this.squareHighlighting = {};
                _this.updateState();
            }
            ;
        };
        this.updateLines = function (piece, useCaptureLines) {
            if (useCaptureLines === void 0) { useCaptureLines = false; }
            var moveLines = useCaptureLines ? piece.captureLines : piece.legalLines;
            var influenceEmptySquare = useCaptureLines ? piece.altInfluenceEmptySquare : piece.influenceEmptySquare;
            var influenceOccupiedSquare = useCaptureLines ? piece.altInfluenceOccupiedSquare : piece.influenceOccupiedSquare;
            var playableLines = [];
            for (var _i = 0, moveLines_1 = moveLines; _i < moveLines_1.length; _i++) {
                var moveLine = moveLines_1[_i];
                var playableLine = [];
                // * Further line search is stop ped when a piece is detected, resulting in [empty..., capture?]
                for (var _a = 0, moveLine_1 = moveLine; _a < moveLine_1.length; _a++) {
                    var linePos = moveLine_1[_a];
                    var square = _this.boardSquares[linePos];
                    var isSquareUnoccupied = (0, lodash_1.isNull)(square.piece);
                    if (isSquareUnoccupied) {
                        var moveAvailable = influenceEmptySquare(square);
                        if (moveAvailable)
                            playableLine.push(linePos);
                    }
                    else {
                        var captureAvailable = influenceOccupiedSquare(square, playableLine);
                        if (captureAvailable)
                            playableLine.push(linePos);
                        break;
                    }
                    ;
                }
                ;
                playableLines.push(playableLine);
            }
            ;
            return playableLines.flat();
        };
        this.updateSideBasicPieces = function (pieces) {
            var _a, _b;
            var checks = [];
            var controlledSquares = new Set();
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                piece.availableMoves = []; // Reset piece moveset
                var regularMoves = _this.updateLines(piece);
                (_a = piece.availableMoves).push.apply(_a, regularMoves);
                if (!(0, lodash_1.isEmpty)(piece.captureAlgorithms)) {
                    var captureMoves = _this.updateLines(piece, true);
                    (_b = piece.availableMoves).push.apply(_b, captureMoves);
                }
                ;
            }
            ;
            return [checks, controlledSquares];
        };
        this.updateKings = function (kings) {
            var _a;
            for (var i in terms_1.SIDES) {
                var side = terms_1.SIDES[i];
                var king = kings[side];
                var enemySide = terms_1.SIDES[1 - Number(i)];
                // TODO: See if I can find a better solution, this implementation is prone to bugs
                var enemyKing = kings[enemySide];
                king.enemyKing = enemyKing;
                king.availableMoves = []; // Reset king movesets
                var newMoves = _this.updateLines(king);
                (_a = king.availableMoves).push.apply(_a, newMoves);
            }
            ;
        };
        this.getCurrentTurnSide = currentTurnSideCallback;
        this.initBoard(startingFormation, alt);
    }
    ;
    /*--------------------------------------------INITIALIZATION---------------------------------------------*/
    BoardManager.prototype.initBoard = function (pieceConfiguration, flipped) {
        if (flipped === void 0) { flipped = false; }
        pieceConfiguration = flipped ? pieceConfiguration : (0, flipFormation_1.default)(pieceConfiguration);
        var startingPieces = this.initPieces(pieceConfiguration);
        this.initSquares(startingPieces);
        // this.updateState();
    };
    ;
    BoardManager.prototype.initPieces = function (pieceConfigurations) {
        var initialPieces = {};
        for (var pos in pieceConfigurations) {
            var pieceConfig = pieceConfigurations[pos];
            console.info(pieceConfig.kind);
            if (pieceConfig.kind === terms_1.PieceKind.Pawn)
                initialPieces[pos] = new Pawn_1.default(pieceConfig.side);
            else if (pieceConfig.kind === terms_1.PieceKind.Rook)
                initialPieces[pos] = new Rook_1.default(pieceConfig.side);
            else if (pieceConfig.kind === terms_1.PieceKind.Knight)
                initialPieces[pos] = new Knight_1.default(pieceConfig.side);
            else if (pieceConfig.kind === terms_1.PieceKind.Bishop)
                initialPieces[pos] = new Bishop_1.default(pieceConfig.side);
            else if (pieceConfig.kind === terms_1.PieceKind.Queen)
                initialPieces[pos] = new Queen_1.default(pieceConfig.side);
            else if (pieceConfig.kind === terms_1.PieceKind.King)
                initialPieces[pos] = new King_1.default(pieceConfig.side);
            else
                throw new Error("Unable to create piece with kind: ".concat(pieceConfig.kind, ", side: ").concat(pieceConfig.side));
        }
        ;
        return initialPieces;
    };
    ;
    BoardManager.prototype.initSquares = function (pieceMapping) {
        for (var tileIndex in terms_1.BOARD_POSITIONS) {
            var position = terms_1.BOARD_POSITIONS[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var piece = pieceMapping[position] || null;
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var square = new Square_1.default(position, squareColor, piece);
            this.boardSquares[position] = square;
        }
        ;
    };
    ;
    // *: Loops over each square on the board to update each piece with their respective available moves
    BoardManager.prototype.processAvailableMoves = function (checks, sideLastMoved) {
        var _a = (0, sortPieces_1.default)(this.boardSquares), basicPieces = _a[0], kings = _a[1];
        basicPieces.white.forEach(function (piece) { return piece.isProtected = false; });
        basicPieces.black.forEach(function (piece) { return piece.isProtected = false; });
        kings.black.checks = [];
        kings.white.checks = [];
        this.updateSideBasicPieces(basicPieces.white);
        this.updateSideBasicPieces(basicPieces.black);
        // Kings are updated after basic pieces to make sure that a king cannot move into a line of check and if it is already in check
        this.updateKings(kings);
        this.applyPins(basicPieces, kings);
        //? Could add a pin updating function here that takes the kings and the other pieces and loops over all of the basic pieces to detect pins
        // checks.push(...(sideLastMoved === "white" ? whiteChecks : blackChecks));
        if (sideLastMoved)
            checks.push.apply(checks, kings[terms_1.SIDES[1 - terms_1.SIDES.indexOf(sideLastMoved)]].checks);
        console.info(this.boardSquares);
        this.updateState();
    };
    ;
    BoardManager.prototype.applyPins = function (basicPieces, kings) {
        for (var i in terms_1.SIDES) {
            var side = terms_1.SIDES[i];
            var enemySide = terms_1.SIDES[1 - Number(i)];
            var enemyKing = kings[enemySide];
            var enemyPos = (0, convertPosition_1.default)(enemyKing.position);
            var _loop_1 = function (piece) {
                var _loop_2 = function (fullLine) {
                    var posIndex = fullLine.indexOf(enemyPos);
                    if (posIndex !== -1) {
                        var attackLine_2 = fullLine.filter(function (_, i) { return i < posIndex; });
                        console.info(attackLine_2);
                        var pinnedPiece = null;
                        for (var _d = 0, attackLine_1 = attackLine_2; _d < attackLine_1.length; _d++) {
                            var _pos = attackLine_1[_d];
                            var destPiece = this_1.boardSquares[_pos].piece;
                            if (destPiece !== null && destPiece.side !== side) {
                                if (pinnedPiece instanceof Piece_1.default) {
                                    pinnedPiece = null;
                                    break;
                                }
                                else {
                                    pinnedPiece = destPiece;
                                }
                            }
                        }
                        ;
                        if (pinnedPiece) {
                            console.log(pinnedPiece);
                            pinnedPiece.availableMoves = pinnedPiece.availableMoves.filter(function (move) { return attackLine_2.includes(move) || move === (0, convertPosition_1.default)(piece.position); });
                        }
                        // let i = 0;
                        // const pinnedPiece: Piece | null = null;
                        // const pos = line[i];
                        // while(pos !== enemyPos) {
                        //   const destPiece = this.boardSquares[pos].piece;
                        //   if (destPiece?.side === enemySide) {
                        //   }
                        // }
                        // for (const pos of line) {
                        //   const destPiece = this.boardSquares[pos].piece;
                        //   if (destPiece?.side === enemySide) {
                        //   }
                        // }
                    }
                };
                for (var _b = 0, _c = piece.legalLines; _b < _c.length; _b++) {
                    var fullLine = _c[_b];
                    _loop_2(fullLine);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = __spreadArray([], basicPieces[side], true); _i < _a.length; _i++) {
                var piece = _a[_i];
                _loop_1(piece);
            }
        }
    };
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map