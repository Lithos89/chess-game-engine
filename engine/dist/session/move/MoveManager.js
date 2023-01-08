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
        this.loopLines = function (piece, callback, callBack2) {
            var playableLines = [];
            var altCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // If a piece can still move there without capturing
            for (var _i = 0, _a = piece.legalLines; _i < _a.length; _i++) {
                var legalLine = _a[_i];
                var playableLine = [];
                for (var _b = 0, legalLine_1 = legalLine; _b < legalLine_1.length; _b++) {
                    var linePos = legalLine_1[_b];
                    var continueLine = callback(linePos, playableLine);
                    if (!continueLine)
                        break;
                }
                ;
                playableLines.push(playableLine);
            }
            ;
            if (altCapturing && !(0, lodash_1.isUndefined)(callBack2)) {
                for (var _c = 0, _d = piece.captureLines; _c < _d.length; _c++) {
                    var captureLine = _d[_c];
                    var playableLine = [];
                    for (var _e = 0, captureLine_1 = captureLine; _e < captureLine_1.length; _e++) {
                        var linePos = captureLine_1[_e];
                        var continueLine = callBack2(linePos, playableLine);
                        if (!continueLine)
                            break;
                    }
                    ;
                    playableLines.push(playableLine);
                }
                ;
            }
            ;
            piece.availableMoves = playableLines.flat();
        };
        this.updateSideBasicPieces = function (board, pieces, side) {
            var checks = [];
            var controlledSquares = new Set();
            var protectedPieces = [];
            var _loop_1 = function (piece) {
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
                var playableLines = [];
                var altCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // If a piece can still move there without capturing
                _this.loopLines(piece, function (linePos, playableLine) {
                    var _a, _b;
                    var squareIsEmpty = board[linePos].piece === null;
                    var simpleCaptureAvailable = ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== side && !altCapturing;
                    if (squareIsEmpty) {
                        if (piece.kind !== terms_1.PieceKind.Pawn) {
                            controlledSquares.add(linePos);
                        }
                        ;
                        playableLine.push(linePos);
                        return true;
                    }
                    else if (simpleCaptureAvailable) {
                        if (((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.kind) === terms_1.PieceKind.King) {
                            checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                        }
                        else {
                            playableLine.push(linePos);
                        }
                        return false;
                    }
                    else {
                        if (piece.kind !== terms_1.PieceKind.Pawn) {
                            board[linePos].piece.isProtected = true;
                            protectedPieces.push(board[linePos].piece);
                        }
                        return false;
                    }
                }, function (linePos, playableLine) {
                    var _a;
                    if (board[linePos].piece !== null && board[linePos].piece.side !== side) {
                        if (((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.kind) === terms_1.PieceKind.King) {
                            checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                            return false;
                        }
                        else {
                            playableLine.push(linePos);
                            return true;
                        }
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
                        return false;
                    }
                    ;
                });
            };
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                _loop_1(piece);
            }
            ;
            return [checks, controlledSquares];
        };
        this.updateKings = function (board, kings, controlledSquares) {
            var _loop_2 = function (i) {
                var side = terms_1.SIDES[i];
                var king = kings[side];
                var enemySide = terms_1.SIDES[1 - Number(i)];
                var enemyKing = kings[enemySide];
                _this.loopLines(king, function (linePos, playableLine) {
                    var _a, _b;
                    var squareIsEmpty = board[linePos].piece === null;
                    var simpleCaptureAvailable = !(0, lodash_1.isNull)(board[linePos].piece) && ((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.side) !== king.side;
                    if (squareIsEmpty && !controlledSquares[enemySide].has(linePos)) {
                        if (!enemyKing.legalLines.flat(2).includes(linePos)) {
                            playableLine.push(linePos);
                        }
                        return true;
                    }
                    else if (simpleCaptureAvailable) {
                        if (!((_b = board[linePos].piece) === null || _b === void 0 ? void 0 : _b.isProtected)) {
                            playableLine.push(linePos);
                        }
                        return false;
                    }
                    else {
                        if (board[linePos].piece) {
                            board[linePos].piece.isProtected = true;
                            // protectedPieces.push(board[linePos].piece);
                        }
                        ;
                        return false;
                    }
                    ;
                });
            };
            for (var i in terms_1.SIDES) {
                _loop_2(i);
            }
        };
    }
    ;
    // *: Loops over each square on the board to update each piece with their respective available moves
    MoveManager.prototype.updateMoves = function (board, sideLastMoved) {
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
        var _a = this.updateSideBasicPieces(board, basicPieces.white, "white"), whiteChecks = _a[0], whiteControlled = _a[1];
        // Black
        var _b = this.updateSideBasicPieces(board, basicPieces.black, "black"), blackChecks = _b[0], blackControlled = _b[1];
        this.updateKings(board, kings, { white: whiteControlled, black: blackControlled });
        var checks = sideLastMoved === "white" ? whiteChecks : blackChecks;
        if (!(0, lodash_1.isEmpty)(checks) && !(0, lodash_1.isUndefined)(sideLastMoved)) {
            var isCheckmate = (Array.from(checks)).map(function (attack) { return EventManager_1.default.forceCheckResolve(board, attack, sideLastMoved); }).some(Boolean);
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