"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Types, interfaces, constants, ...
var terms_1 = require("../../logic/terms");
// Classes
var MoveHistoryLL_1 = require("./MoveHistoryLL");
var EventManager_1 = require("../game/EventManager");
// Util
var utils_1 = require("../../utils");
;
//*: Functions to include in this class
/*
  - Victory check
  - "Check" check
  - Draw check
    - 3 Repeated Move check
    - Insufficient Material Check
  ?: - Time check (if I decide to take the app this far)
*/
// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
var MoveManager = /** @class */ (function () {
    function MoveManager(updateState) {
        var _this = this;
        this.updateState = updateState;
        this.moveLL = new MoveHistoryLL_1.default();
        this.captures = {
            white: { p: 0, r: 0, h: 0, b: 0, q: 0 },
            black: { p: 0, r: 0, h: 0, b: 0, q: 0 },
        };
        this.takebackMove = function () {
            _this.moveLL.removeLastMove();
            console.info(_this.moveLL.listMoves());
            // ?: Will also update the board with the new state reflecting the takeback
            // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
        };
        this.getMoveHistory = function () {
            var moveList = _this.moveLL.listMoves();
            var moveListAscending = moveList.reverse();
            // !: Need to clean this up
            var compiledMoves = moveListAscending.map(function (v, i, arr) {
                var isEven = i % 2 === 0;
                if (isEven) {
                    if (arr[i + 1] !== 'undefined') {
                        return [arr[i], arr[i + 1]];
                    }
                    else {
                        return [arr[i], ''];
                    }
                    ;
                }
                ;
            }).filter(function (v) { return v !== undefined; });
            return compiledMoves;
        };
        this.capture = function (piece) {
            _this.captures[terms_1.SIDES[1 - terms_1.SIDES.indexOf(piece.side)]][piece.kind] += 1;
            _this.updateState('capture');
        };
        // Idea for algorithm to find out if a piece is pinned
        /*
          For each piece, go through it's line of attack and see if the queen is in part of the line. Then if the queen is a part of that line
          go through all the squares bettween the piece and the queen. Then count the number of pieces that are between the two.
          If there is more than one piece, then restrict the pinned pieces moves to those that are between the two pieces.
        */
        this.commitMove = function (origin, dest) {
            var originPiece = origin.piece;
            origin.piece = null;
            var destPiece = dest.piece;
            if (destPiece !== null)
                _this.capture(destPiece);
            _this.moveLL.addMove(originPiece.logMove((0, utils_1.convertPosition)(dest.position), !!destPiece));
            _this.updateState('move-log');
            if (originPiece.isMultiBehavioral() && originPiece.moved === false)
                originPiece.moved = true;
            dest.setPiece(originPiece);
            // this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
            // console.log(this.moveLL.listMoves());
            _this.updateState('board');
        };
        // *: Loops over each square on the board to update each piece with their respective available moves
        this.updateMoves = function (board, sideLastMoved) {
            var _a, _b;
            //* King related stuff
            var checks = [];
            var whiteControlled = new Set();
            var blackControlled = new Set();
            var protectedPieces = [];
            // TODO: See if I am better able to handle this logic so taht I don't have to store the kings in a variable
            var whiteKing;
            var blackKing;
            //*
            for (var boardPos in board) {
                var square = board[boardPos];
                var piece = square.piece;
                if ((0, lodash_1.isNull)(piece)) {
                    continue;
                }
                ;
                if (piece.kind === terms_1.PieceKind.King) {
                    if (piece.side === 'white')
                        whiteKing = piece;
                    else if (piece.side === 'black') {
                        blackKing = piece;
                    }
                    ;
                    continue;
                }
                ;
                // Reset the protection of the piece if it is not already set to be protected across this update
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
                var pieceSide = piece.side;
                var playableLines = [];
                var altCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // If a piece can still move there without capturing
                for (var _i = 0, _c = piece.legalLines; _i < _c.length; _i++) {
                    var legalLine = _c[_i];
                    var playableLine = [];
                    for (var _d = 0, legalLine_1 = legalLine; _d < legalLine_1.length; _d++) {
                        var linePos = legalLine_1[_d];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== pieceSide && !altCapturing;
                        if (squareIsEmpty) {
                            if (piece.kind !== terms_1.PieceKind.Pawn) {
                                if (piece.side === "white") {
                                    whiteControlled.add(linePos);
                                }
                                else {
                                    blackControlled.add(linePos);
                                }
                                ;
                            }
                            ;
                            playableLine.push(linePos);
                        }
                        else if (simpleCaptureAvailable) {
                            if (((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.kind) === terms_1.PieceKind.King) {
                                checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                            }
                            else {
                                playableLine.push(linePos);
                            }
                            break;
                        }
                        else {
                            if (piece.kind !== terms_1.PieceKind.Pawn) {
                                board[linePos].piece.isProtected = true;
                                protectedPieces.push(board[linePos].piece);
                            }
                            break;
                        }
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
                if (altCapturing) {
                    for (var _e = 0, _f = piece.captureLines; _e < _f.length; _e++) {
                        var captureLine = _f[_e];
                        var playableLine = [];
                        for (var _g = 0, captureLine_1 = captureLine; _g < captureLine_1.length; _g++) {
                            var linePos = captureLine_1[_g];
                            if (board[linePos].piece !== null && board[linePos].piece.side !== pieceSide) {
                                playableLine.push(linePos);
                            }
                            else {
                                if (board[linePos].piece) {
                                    board[linePos].piece.isProtected = true;
                                    protectedPieces.push(board[linePos].piece);
                                }
                                else {
                                    if (piece.side === "white") {
                                        whiteControlled.add(linePos);
                                    }
                                    else {
                                        blackControlled.add(linePos);
                                    }
                                    ;
                                }
                                ;
                                break;
                            }
                            ;
                        }
                        ;
                        playableLines.push(playableLine);
                    }
                    ;
                }
                ;
                piece.availableMoves = playableLines.flat();
            }
            ;
            //* King Updating
            var updateKing = function (king, controlledSquares) {
                var _a, _b;
                var playableLines = [];
                for (var _i = 0, _c = king.legalLines; _i < _c.length; _i++) {
                    var legalLine = _c[_i];
                    var playableLine = [];
                    for (var _d = 0, legalLine_2 = legalLine; _d < legalLine_2.length; _d++) {
                        var linePos = legalLine_2[_d];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = !(0, lodash_1.isNull)(board[linePos].piece) && ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== king.side;
                        if (squareIsEmpty && !controlledSquares.has(linePos)) {
                            if (king.side === "white") {
                                if (!blackKing.legalLines.flat(2).includes(linePos)) {
                                    playableLine.push(linePos);
                                }
                            }
                            else {
                                if (!whiteKing.legalLines.flat(2).includes(linePos)) {
                                    playableLine.push(linePos);
                                }
                            }
                        }
                        else if (simpleCaptureAvailable) {
                            if (!((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.isProtected)) {
                                playableLine.push(linePos);
                            }
                            break;
                        }
                        else {
                            if (board[linePos].piece) {
                                board[linePos].piece.isProtected = true;
                                protectedPieces.push(board[linePos].piece);
                            }
                            ;
                            break;
                        }
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
                king.availableMoves = playableLines.flat();
            };
            updateKing(whiteKing, blackControlled);
            updateKing(blackKing, whiteControlled);
            //* Check / Checkmate related
            if (!(0, lodash_1.isEmpty)(checks) && sideLastMoved) {
                var isCheckmate = checks.map(function (attack) { return EventManager_1.default.forceCheckResolve(board, attack, sideLastMoved); }).some(Boolean);
                if (isCheckmate) {
                    console.info("Checkmate");
                }
                else {
                    console.info("Check");
                }
            }
            _this.updateState('board');
        };
        this.tempUpdateSideBasicPieces = function (board, pieces, side) {
            var _a, _b;
            var checks = [];
            var controlledSquares = new Set();
            var protectedPieces = [];
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
                var playableLines = [];
                var altCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // If a piece can still move there without capturing
                for (var _c = 0, _d = piece.legalLines; _c < _d.length; _c++) {
                    var legalLine = _d[_c];
                    var playableLine = [];
                    for (var _e = 0, legalLine_3 = legalLine; _e < legalLine_3.length; _e++) {
                        var linePos = legalLine_3[_e];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== side && !altCapturing;
                        if (squareIsEmpty) {
                            if (piece.kind !== terms_1.PieceKind.Pawn) {
                                controlledSquares.add(linePos);
                            }
                            ;
                            playableLine.push(linePos);
                        }
                        else if (simpleCaptureAvailable) {
                            if (((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.kind) === terms_1.PieceKind.King) {
                                checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                            }
                            else {
                                playableLine.push(linePos);
                            }
                            break;
                        }
                        else {
                            if (piece.kind !== terms_1.PieceKind.Pawn) {
                                board[linePos].piece.isProtected = true;
                                protectedPieces.push(board[linePos].piece);
                            }
                            break;
                        }
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
                if (altCapturing) {
                    for (var _f = 0, _g = piece.captureLines; _f < _g.length; _f++) {
                        var captureLine = _g[_f];
                        var playableLine = [];
                        for (var _h = 0, captureLine_2 = captureLine; _h < captureLine_2.length; _h++) {
                            var linePos = captureLine_2[_h];
                            if (board[linePos].piece !== null && board[linePos].piece.side !== side) {
                                playableLine.push(linePos);
                            }
                            else {
                                if (board[linePos].piece) {
                                    board[linePos].piece.isProtected = true;
                                    protectedPieces.push(board[linePos].piece);
                                }
                                else {
                                    controlledSquares.add(linePos);
                                }
                                ;
                                break;
                            }
                            ;
                        }
                        ;
                        playableLines.push(playableLine);
                    }
                    ;
                }
                ;
                piece.availableMoves = playableLines.flat();
            }
            ;
            return [checks, controlledSquares];
        };
        this.tempUpdateKings = function (board, kings, controlledSquares) {
            var _a, _b;
            for (var i in terms_1.SIDES) {
                var side = terms_1.SIDES[i];
                var king = kings[side];
                var enemySide = terms_1.SIDES[1 - Number(i)];
                var enemyKing = kings[enemySide];
                var playableLines = [];
                for (var _i = 0, _c = king.legalLines; _i < _c.length; _i++) {
                    var legalLine = _c[_i];
                    var playableLine = [];
                    for (var _d = 0, legalLine_4 = legalLine; _d < legalLine_4.length; _d++) {
                        var linePos = legalLine_4[_d];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = !(0, lodash_1.isNull)(board[linePos].piece) && ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== king.side;
                        if (squareIsEmpty && !controlledSquares[enemySide].has(linePos)) {
                            if (!enemyKing.legalLines.flat(2).includes(linePos)) {
                                playableLine.push(linePos);
                            }
                        }
                        else if (simpleCaptureAvailable) {
                            if (!((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.isProtected)) {
                                playableLine.push(linePos);
                            }
                            break;
                        }
                        else {
                            if (board[linePos].piece) {
                                board[linePos].piece.isProtected = true;
                                // protectedPieces.push(board[linePos].piece);
                            }
                            ;
                            break;
                        }
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
                king.availableMoves = playableLines.flat();
                // return protectedPieces
            }
        };
    }
    ;
    MoveManager.prototype.tempUpdateMoves = function (board, sideLastMoved) {
        var basicPieces = {
            white: [],
            black: []
        };
        var kings = {};
        for (var boardPos in board) {
            var square = board[boardPos];
            var piece = square.piece;
            if ((0, lodash_1.isNull)(piece)) {
                continue;
            }
            ;
            if (piece.kind === terms_1.PieceKind.King) {
                if (piece.side === 'white')
                    kings.white = piece;
                else if (piece.side === 'black') {
                    kings.black = piece;
                }
                ;
            }
            else {
                if (piece.side === 'white')
                    basicPieces.white.push(piece);
                else if (piece.side === 'black') {
                    basicPieces.black.push(piece);
                }
                ;
            }
            ;
        }
        ;
        // White
        var _a = this.tempUpdateSideBasicPieces(board, basicPieces.white, "white"), whiteChecks = _a[0], whiteControlled = _a[1];
        // Black
        var _b = this.tempUpdateSideBasicPieces(board, basicPieces.black, "black"), blackChecks = _b[0], blackControlled = _b[1];
        this.tempUpdateKings(board, kings, { white: whiteControlled, black: blackControlled });
        var checks = sideLastMoved === "white" ? Array.from(whiteChecks) : Array.from(blackChecks);
        if (!(0, lodash_1.isEmpty)(checks) && sideLastMoved) {
            var isCheckmate = (checks).map(function (attack) { return EventManager_1.default.forceCheckResolve(board, attack, sideLastMoved); }).some(Boolean);
            if (isCheckmate) {
                console.info("Checkmate");
            }
            else {
                console.info("Check");
            }
        }
        this.updateState('board');
    };
    ;
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map