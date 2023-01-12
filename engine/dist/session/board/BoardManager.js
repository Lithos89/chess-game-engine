"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Components
var Square_1 = require("../../components/Square");
var piece_1 = require("../../components/piece");
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
            if (piece instanceof piece_1.default) {
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
            // TODO: At the moment this does not work, need to allow for the function to be able to access 'alt' methods
            for (var _i = 0, _a = [piece.legalLines, piece.captureLines]; _i < _a.length; _i++) {
                var moveLineSet = _a[_i];
                for (var _b = 0, moveLineSet_1 = moveLineSet; _b < moveLineSet_1.length; _b++) {
                    var moveLine = moveLineSet_1[_b];
                    var playableLine = [];
                    // * Further line search is stop ped when a piece is detected, resulting in [empty..., capture?]
                    for (var _c = 0, moveLine_2 = moveLine; _c < moveLine_2.length; _c++) {
                        var linePos = moveLine_2[_c];
                        var square = _this.boardSquares[linePos];
                        // TODO: Try making it the negation to allow for better if else flow down below
                        var isSquareOccupied = !(square.piece === null);
                        var moveAvailable = void 0;
                        if (isSquareOccupied) {
                            moveAvailable = piece.influenceEmptySquare(square);
                            break;
                        }
                        else {
                            moveAvailable = piece.influenceOccupiedSquare(square, playableLine);
                        }
                        ;
                        if (moveAvailable)
                            playableLine.push(linePos);
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
                return playableLines.flat();
            }
            ;
        };
        this.updateSideBasicPieces = function (pieces) {
            var _a;
            var checks = [];
            var controlledSquares = new Set();
            var protectedPieces = [];
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                piece.availableMoves = []; // Reset piece moveset
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
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
                var enemyKing = kings[enemySide];
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
            initialPieces[pos] = piece_1.default.create(pieceConfig);
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
        this.updateSideBasicPieces(basicPieces.white);
        this.updateSideBasicPieces(basicPieces.black);
        // Kings are updated after basic pieces to make sure that a king cannot move into a line of check and if it is already in check
        this.updateKings(kings);
        //? Could add a pin updating function here that takes the kings and the other pieces and loops over all of the basic pieces to detect pins
        // checks.push(...(sideLastMoved === "white" ? whiteChecks : blackChecks));
        checks.push.apply(checks, piece_1.King[sideLastMoved].checks);
        this.updateState();
    };
    ;
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map