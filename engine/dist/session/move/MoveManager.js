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
          For each piece, go through it's line of attack and see if the king is in part of the line. Then if the king is a part of that line
          go through all the squares bettween the piece and the king. Then count the number of pieces that are between the two.
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
        this.loopLines = function (moveLines, isSquareOccupied, emptySquareCallback, occupiedSquareCallback) {
            var playableLines = [];
            for (var _i = 0, moveLines_1 = moveLines; _i < moveLines_1.length; _i++) {
                var moveLine = moveLines_1[_i];
                var playableLine = [];
                // * Further line search is stopped when a piece is detected, resulting in [empty..., capture?]
                for (var _a = 0, moveLine_1 = moveLine; _a < moveLine_1.length; _a++) {
                    var linePos = moveLine_1[_a];
                    if (isSquareOccupied(linePos)) {
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
        this.updateSideBasicPieces = function (board, pieces, side) {
            var checks = [];
            var controlledSquares = new Set();
            var protectedPieces = [];
            var doesPieceExist = function (pos) { return !(board[pos].piece === null); };
            var emptySquareCallback = function (piece) { return function (linePos) {
                if (piece.kind !== terms_1.PieceKind.Pawn) {
                    controlledSquares.add(linePos);
                }
                ;
                return true;
            }; };
            var occupiedSquareCallback = function (piece) { return function (linePos, playableLine) {
                var destPiece = board[linePos].piece;
                var altCapturing = !(0, lodash_1.isEmpty)(piece.captureAlgorithms); // If a piece can still move there without capturing
                var simpleCaptureAvailable = (destPiece === null || destPiece === void 0 ? void 0 : destPiece.side) !== side && !altCapturing;
                if (simpleCaptureAvailable) {
                    if ((destPiece === null || destPiece === void 0 ? void 0 : destPiece.kind) === terms_1.PieceKind.King) {
                        checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                    }
                    else {
                        return true;
                    }
                    ;
                }
                else {
                    if (piece.kind !== terms_1.PieceKind.Pawn) {
                        destPiece.isProtected = true;
                        protectedPieces.push(destPiece);
                    }
                    ;
                }
                ;
                return false;
            }; };
            var _loop_1 = function (piece) {
                piece.availableMoves = []; // Reset piece moveset
                var newMoves = [];
                if (!protectedPieces.includes(piece))
                    piece.isProtected = false;
                var regularMoves = _this.loopLines(piece.legalLines, doesPieceExist, emptySquareCallback(piece), occupiedSquareCallback(piece));
                newMoves.push.apply(newMoves, regularMoves);
                if (!(0, lodash_1.isEmpty)(piece.captureAlgorithms)) {
                    var captureMoves = _this.loopLines(piece.captureLines, doesPieceExist, function (linePos) {
                        controlledSquares.add(linePos);
                        return false;
                    }, function (linePos, playableLine) {
                        var _a;
                        if (board[linePos].piece.side !== side) {
                            if (((_a = board[linePos].piece) === null || _a === void 0 ? void 0 : _a.kind) === terms_1.PieceKind.King) {
                                checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            board[linePos].piece.isProtected = true;
                            protectedPieces.push(board[linePos].piece);
                            return false;
                        }
                        ;
                    });
                    newMoves.push.apply(newMoves, captureMoves);
                }
                ;
                piece.availableMoves = newMoves;
            };
            for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                var piece = pieces_1[_i];
                _loop_1(piece);
            }
            ;
            return [checks, controlledSquares];
        };
        this.updateKings = function (board, kings, controlledSquares) {
            var doesPieceExist = function (pos) { return !(board[pos].piece === null); };
            var occupiedSquareCallback = function (king) { return function (linePos) {
                var destPiece = board[linePos].piece;
                var simpleCaptureAvailable = !(0, lodash_1.isNull)(destPiece) && (destPiece === null || destPiece === void 0 ? void 0 : destPiece.side) !== king.side;
                if (simpleCaptureAvailable) {
                    if (!(destPiece === null || destPiece === void 0 ? void 0 : destPiece.isProtected)) {
                        return true;
                    }
                    ;
                }
                else {
                    if (destPiece)
                        board[linePos].piece.isProtected = true;
                }
                ;
                return false;
            }; };
            var _loop_2 = function (i) {
                var side = terms_1.SIDES[i];
                var king = kings[side];
                var enemySide = terms_1.SIDES[1 - Number(i)];
                var enemyKing = kings[enemySide];
                king.availableMoves = [];
                var newMoves = [];
                var emptySquareCallback = function (linePos) {
                    if (!controlledSquares[enemySide].has(linePos)) {
                        if (!enemyKing.legalLines.flat(2).includes(linePos)) {
                            return true;
                        }
                        ;
                    }
                    ;
                    return false;
                };
                var moves = _this.loopLines(king.legalLines, doesPieceExist, emptySquareCallback, occupiedSquareCallback(king));
                newMoves.push.apply(newMoves, moves);
                king.availableMoves = newMoves;
            };
            for (var i in terms_1.SIDES) {
                _loop_2(i);
            }
            ;
        };
    }
    ;
    // *: Loops over each square on the board to update each piece with their respective available moves
    MoveManager.prototype.updateMoves = function (board, sideLastMoved) {
        var _a = (0, utils_1.sortPieces)(board), basicPieces = _a[0], kings = _a[1];
        var _b = this.updateSideBasicPieces(board, basicPieces.white, "white"), whiteChecks = _b[0], whiteControlled = _b[1];
        var _c = this.updateSideBasicPieces(board, basicPieces.black, "black"), blackChecks = _c[0], blackControlled = _c[1];
        // Kings are updated after basic pieces to make sure that a king cannot move into a line of check and if it is already in check
        this.updateKings(board, kings, { white: whiteControlled, black: blackControlled });
        //? Could add a pin updating function here that takes the kings and the other pieces and loops over all of the basic pieces to detect pins
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