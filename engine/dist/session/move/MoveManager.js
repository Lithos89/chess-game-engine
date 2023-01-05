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
            var _a, _b, _c, _d;
            var checks = [];
            var whiteControlled = new Set();
            var blackControlled = new Set();
            var protectedPieces = [];
            var whiteKing;
            var blackKing;
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
                    continue;
                }
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
                var pieceSide = piece.side;
                var playableLines = [];
                var uniqueCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // Piece can still move there without capturing
                for (var _i = 0, _e = piece.legalLines; _i < _e.length; _i++) {
                    var legalLine = _e[_i];
                    var playableLine = [];
                    for (var _f = 0, legalLine_1 = legalLine; _f < legalLine_1.length; _f++) {
                        var linePos = legalLine_1[_f];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== pieceSide && !uniqueCapturing;
                        if (squareIsEmpty) {
                            if (piece.kind !== terms_1.PieceKind.Pawn) {
                                if (piece.side === "white") {
                                    whiteControlled.add(linePos);
                                }
                                else {
                                    blackControlled.add(linePos);
                                }
                            }
                            playableLine.push(linePos);
                        }
                        else if (simpleCaptureAvailable) {
                            if (((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.kind) === terms_1.PieceKind.King) {
                                checks.push({ attackPiece: piece, frontAttackLine: playableLine, fullAttackLine: legalLine });
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
                if (uniqueCapturing) {
                    for (var _g = 0, _h = piece.captureLines; _g < _h.length; _g++) {
                        var captureLine = _h[_g];
                        var playableLine = [];
                        for (var _j = 0, captureLine_1 = captureLine; _j < captureLine_1.length; _j++) {
                            var linePos = captureLine_1[_j];
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
            //* King Updating (still have to account for the fact that the )
            for (var _k = 0, _l = [whiteKing, blackKing]; _k < _l.length; _k++) {
                var piece = _l[_k];
                var playableLines = [];
                console.info(blackControlled);
                console.info(whiteControlled);
                var badSquares = piece.side === "white" ? blackControlled : whiteControlled;
                for (var _m = 0, _o = piece.legalLines; _m < _o.length; _m++) {
                    var legalLine = _o[_m];
                    var playableLine = [];
                    for (var _p = 0, legalLine_2 = legalLine; _p < legalLine_2.length; _p++) {
                        var linePos = legalLine_2[_p];
                        var squareIsEmpty = board[linePos].piece === null;
                        var simpleCaptureAvailable = !(0, lodash_1.isNull)(board[linePos].piece) && ((_c = board[linePos].piece) === null || _c === void 0 ? void 0 : _c.side) !== piece.side;
                        if (squareIsEmpty && !badSquares.has(linePos)) {
                            if (piece.side === "white") {
                                if (!blackKing.legalLines.flat().includes(linePos)) {
                                    console.info("linepos: ", linePos);
                                    console.info("set: ", badSquares);
                                    playableLine.push(linePos);
                                }
                            }
                            else {
                                if (!whiteKing.legalLines.flat().includes(linePos)) {
                                    console.info("linepos: ", linePos);
                                    console.info("set: ", badSquares);
                                    playableLine.push(linePos);
                                }
                            }
                        }
                        else if (simpleCaptureAvailable) {
                            if (!((_d = board[linePos].piece) === null || _d === void 0 ? void 0 : _d.isProtected)) {
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
                piece.availableMoves = playableLines.flat();
            }
            //* Check / Checkmate related
            if (!(0, lodash_1.isEmpty)(checks)) {
                var isCheckmate = checks.map(function (v, i) { return EventManager_1.default.forceCheckResolve(board, v, sideLastMoved); }).some(Boolean);
                if (isCheckmate) {
                    console.info("Checkmate");
                }
                else {
                    console.info("Check");
                }
            }
            _this.updateState('board');
        };
    }
    ;
    return MoveManager;
}());
;
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map