"use strict";
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
        this.loopLines = function (moveLines, emptySquareCallback, occupiedSquareCallback) {
            var playableLines = [];
            for (var _i = 0, moveLines_1 = moveLines; _i < moveLines_1.length; _i++) {
                var moveLine = moveLines_1[_i];
                var playableLine = [];
                // * Further line search is stopped when a piece is detected, resulting in [empty..., capture?]
                for (var _a = 0, moveLine_1 = moveLine; _a < moveLine_1.length; _a++) {
                    var linePos = moveLine_1[_a];
                    var isSquareOccupied = !(_this.boardSquares[linePos].piece === null);
                    if (isSquareOccupied) {
                        var captureAvailable = occupiedSquareCallback(linePos, playableLine);
                        if (captureAvailable)
                            playableLine.push(linePos);
                        break;
                    }
                    else {
                        var moveAvailable = emptySquareCallback(linePos);
                        if (moveAvailable)
                            playableLine.push(linePos);
                    }
                    ;
                }
                ;
                playableLines.push(playableLine);
            }
            ;
            return playableLines.flat();
        };
        this.updateLines = function (piece) {
            var playableLines = [];
            for (var _i = 0, _a = piece.legalLines; _i < _a.length; _i++) {
                var moveLine = _a[_i];
                var playableLine = [];
                // * Further line search is stop ped when a piece is detected, resulting in [empty..., capture?]
                for (var _b = 0, moveLine_2 = moveLine; _b < moveLine_2.length; _b++) {
                    var linePos = moveLine_2[_b];
                    var square = _this.boardSquares[linePos];
                    var isSquareUnoccupied = (0, lodash_1.isNull)(square.piece);
                    if (isSquareUnoccupied) {
                        var moveAvailable = piece.influenceEmptySquare(square);
                        if (moveAvailable)
                            playableLine.push(linePos);
                    }
                    else {
                        var captureAvailable = piece.influenceOccupiedSquare(square, playableLine);
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
            if (piece instanceof Pawn_1.default) {
                for (var _c = 0, _d = piece.captureLines; _c < _d.length; _c++) {
                    var moveLine = _d[_c];
                    var playableLine = [];
                    // * Further line search is stop ped when a piece is detected, resulting in [empty..., capture?]
                    for (var _e = 0, moveLine_3 = moveLine; _e < moveLine_3.length; _e++) {
                        var linePos = moveLine_3[_e];
                        var square = _this.boardSquares[linePos];
                        var isSquareUnoccupied = (0, lodash_1.isNull)(square.piece);
                        if (isSquareUnoccupied) {
                            var moveAvailable = piece.altInfluenceEmptySquare(square);
                            if (moveAvailable)
                                playableLine.push(linePos);
                        }
                        else {
                            var captureAvailable = piece.altInfluenceOccupiedSquare(square, playableLine);
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
            }
            return playableLines.flat();
        };
        this.updateSideBasicPieces = function (pieces) {
            var _a;
            var checks = [];
            var controlledSquares = new Set();
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                piece.availableMoves = []; // Reset piece moveset
                var regularMoves = _this.updateLines(piece);
                (_a = piece.availableMoves).push.apply(_a, regularMoves);
                // if (!isEmpty(piece.captureAlgorithms)) {
                // !: Note that this if clause is not scalable as is
                // if (piece instanceof Pawn) {
                //   const captureMoves = this.updateLines(piece);
                //   piece.availableMoves.push(...captureMoves);
                // };
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
            // switch (pieceConfig.kind) {
            //   case PieceKind.Pawn:
            //   // case 'p':
            //     initialPieces[pos] = new Pawn(pieceConfig.side);
            //   case PieceKind.Rook:
            //   // case 'r':
            //     initialPieces[pos] = new Rook(pieceConfig.side);
            //   case PieceKind.Knight:
            //   // case 'h':
            //     initialPieces[pos] = new Knight(pieceConfig.side);
            //   case PieceKind.Bishop:
            //   // case 'b':
            //     initialPieces[pos] = new Bishop(pieceConfig.side);
            //   case PieceKind.Queen:
            //   // case 'q':
            //     initialPieces[pos] = new Queen(pieceConfig.side);
            //   case PieceKind.King:
            //   // case 'k':
            //     initialPieces[pos] = new King(pieceConfig.side);
            //   default:
            //     throw new Error(`Unable to create piece with kind: ${pieceConfig.kind}, side: ${pieceConfig.side}`);
            // };
            // initialPieces[pos] = Piece.create(pieceConfiguration[pos]);
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
        this.updateSideBasicPieces(basicPieces.white);
        this.updateSideBasicPieces(basicPieces.black);
        // Kings are updated after basic pieces to make sure that a king cannot move into a line of check and if it is already in check
        this.updateKings(kings);
        //? Could add a pin updating function here that takes the kings and the other pieces and loops over all of the basic pieces to detect pins
        // checks.push(...(sideLastMoved === "white" ? whiteChecks : blackChecks));
        if (sideLastMoved)
            checks.push.apply(checks, King_1.default[sideLastMoved].checks);
        this.updateState();
    };
    ;
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map