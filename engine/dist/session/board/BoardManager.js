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
var Piece_1 = require("../../components/piece/Piece");
var King_1 = require("../../components/piece/King");
var Rook_1 = require("../../components/piece/Rook");
// Utils
var flipFormation_1 = require("../../utils/board/flipFormation");
var sortPieces_1 = require("../../utils/board/sortPieces");
var createPiece_1 = require("../../utils/piece/createPiece");
var convertPosition_1 = require("../../utils/regulation/position/convertPosition");
var getEnemySide_1 = require("../../utils/regulation/side/getEnemySide");
var BoardManager = /** @class */ (function () {
    function BoardManager(startingFormation, flipped, currentTurnSideCallback, updateState) {
        var _this = this;
        this.updateState = updateState;
        this.boardSquares = {};
        this.squareHighlighting = {};
        /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/
        // TODO: Fix the paramters so that it tracks the different highlighted action type
        this.compileBoard = function () {
            var processedBoard = [];
            for (var pos in _this.boardSquares) {
                processedBoard.push({
                    position: pos,
                    square: {
                        color: _this.boardSquares[pos].color,
                        focus: (pos in _this.squareHighlighting) ?
                            _this.squareHighlighting[pos] :
                            { highlighted: false, action: null },
                    },
                    piece: _this.boardSquares[pos].piece ?
                        {
                            kind: _this.boardSquares[pos].piece.kind,
                            side: _this.boardSquares[pos].piece.side,
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
        this.getCurrentTurnSide = currentTurnSideCallback;
        this.initBoard(startingFormation, flipped);
    }
    ;
    /*--------------------------------------------INITIALIZATION---------------------------------------------*/
    BoardManager.prototype.initBoard = function (pieceConfiguration, flipped) {
        if (flipped === void 0) { flipped = false; }
        pieceConfiguration = flipped ? pieceConfiguration : (0, flipFormation_1.default)(pieceConfiguration);
        var startingPieces = this.initPieces(pieceConfiguration);
        this.initSquares(startingPieces);
    };
    ;
    BoardManager.prototype.initPieces = function (pieceConfigurations) {
        var initialPieces = {};
        for (var pos in pieceConfigurations) {
            var _a = pieceConfigurations[pos], kind = _a.kind, side = _a.side;
            initialPieces[pos] = (0, createPiece_1.default)(kind, side);
        }
        ;
        return initialPieces;
    };
    ;
    BoardManager.prototype.initSquares = function (pieceMapping) {
        var _this = this;
        for (var tileIndex in terms_1.BOARD_POSITIONS) {
            var position = terms_1.BOARD_POSITIONS[tileIndex];
            var regex = /b|d|f|h/;
            var isEvenRow = regex.test(position);
            var squareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
            var startingPiece = pieceMapping[position] || null;
            var temp = function (side) { return function (direction) {
                // ! Still will need to factor in alt board orientation for the different sides
                if (side === "white" && direction === '+') {
                    var squaresToCheck = ["f1", "g1"];
                    var clear = squaresToCheck.every(function (pos) {
                        var square = _this.boardSquares[pos];
                        var isUnnocupied = square.piece === null;
                        var isControlledByEnemy = square.controlled[(0, getEnemySide_1.default)(side)] === true;
                        return isUnnocupied && !isControlledByEnemy;
                    });
                    var rookCheck = _this.boardSquares["h1"].piece instanceof Rook_1.default && !_this.boardSquares["h1"].piece.moved;
                    if (clear && rookCheck) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (side === "white" && direction === '-') {
                    var squaresToCheck = ["c1", "d1"];
                    var clear = squaresToCheck.every(function (pos) {
                        var square = _this.boardSquares[pos];
                        var isUnnocupied = square.piece === null;
                        var isControlledByEnemy = square.controlled[(0, getEnemySide_1.default)(side)] === true;
                        return isUnnocupied && !isControlledByEnemy;
                    });
                    var tempCheck = _this.boardSquares["b1"].controlled[(0, getEnemySide_1.default)(side)] === false;
                    var rookCheck = _this.boardSquares["a1"].piece instanceof Rook_1.default && !_this.boardSquares["a1"].piece.moved;
                    if (clear && rookCheck && tempCheck) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }; };
            if (startingPiece instanceof King_1.default) {
                startingPiece.castleAvailableCallback = temp(startingPiece.side);
            }
            this.boardSquares[position] = new Square_1.default(position, squareColor, startingPiece);
        }
        ;
    };
    ;
    /*-----------------------------------CHESS RULES APPLICATION---------------------------------------*/
    // *: Loops over each square on the board to update each piece with their respective available moves
    BoardManager.prototype.processAvailableMoves = function (checks, sideLastMoved) {
        //* Basic piece defined as any piece other than a king
        var _a = (0, sortPieces_1.default)(this.boardSquares), basicPieces = _a[0], kings = _a[1];
        // Reset each piece's protected (king cannot capture) status and attacks that the king recieved
        basicPieces.white.forEach(function (piece) { return piece.isProtected = false; });
        basicPieces.black.forEach(function (piece) { return piece.isProtected = false; });
        kings.black.checks = [];
        kings.white.checks = [];
        // Updates checks, protection, square control, and available moves excluding check, 
        this.updateBasicPieces(basicPieces.white);
        this.updateBasicPieces(basicPieces.black);
        // Update kings' available moves
        this.updateKings(kings);
        // Restrict the movement of pieces if it is in an absolute pin (moving out the way would result in an illegal check)
        this.applyPins(basicPieces, kings);
        // Update the game's checks based off the last move the opponent made
        if (sideLastMoved) {
            var enemyChecks = kings[(0, getEnemySide_1.default)(sideLastMoved)].checks;
            checks.push.apply(checks, enemyChecks);
        }
        ;
        this.updateState();
    };
    ;
    // *: Process piece's influence on the board based on its legal lines or capture lines
    BoardManager.prototype.updatePieceMoves = function (piece) {
        var playableLines = [];
        // TODO: Figure out a way to destructure these properties using clean code
        var standardMovement = [
            piece.legalLines,
            piece.influenceEmptySquare,
            piece.influenceOccupiedSquare
        ];
        var movementTypes = __spreadArray([
            standardMovement
        ], (piece.hasAlternativeCapturing() ? [[
                piece.captureLines,
                piece.altInfluenceEmptySquare,
                piece.altInfluenceOccupiedSquare
            ]] : []), true);
        for (var _i = 0, movementTypes_1 = movementTypes; _i < movementTypes_1.length; _i++) {
            var movementObj = movementTypes_1[_i];
            var moveLines = movementObj[0], influenceEmptySquare = movementObj[1], influenceOccupiedSquare = movementObj[2];
            for (var _a = 0, moveLines_1 = moveLines; _a < moveLines_1.length; _a++) {
                var moveLine = moveLines_1[_a];
                var playableLine = [];
                // * Further line search is stopped when a piece is detected, resulting in [empty..., capture?]
                for (var _b = 0, moveLine_1 = moveLine; _b < moveLine_1.length; _b++) {
                    var linePos = moveLine_1[_b];
                    var square = this.boardSquares[linePos];
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
        }
        ;
        // Disseminate lines into a simple list of available moves
        return playableLines.flat();
    };
    ;
    BoardManager.prototype.updateBasicPieces = function (pieces) {
        var _a;
        for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
            var piece = pieces_1[_i];
            piece.availableMoves = []; // Reset piece moveset
            var updatedMoveSet = this.updatePieceMoves(piece);
            (_a = piece.availableMoves).push.apply(_a, updatedMoveSet);
        }
        ;
    };
    ;
    BoardManager.prototype.updateKings = function (kings) {
        var _a;
        for (var _i = 0, SIDES_1 = terms_1.SIDES; _i < SIDES_1.length; _i++) {
            var side = SIDES_1[_i];
            var king = kings[side];
            var enemySide = (0, getEnemySide_1.default)(side);
            // TODO: See if I can find a better solution, this implementation is prone to bugs
            var enemyKing = kings[enemySide];
            king.enemyKing = enemyKing;
            king.availableMoves = []; // Reset moveset
            var updatedMoveSet = this.updatePieceMoves(king);
            (_a = king.availableMoves).push.apply(_a, updatedMoveSet);
        }
        ;
    };
    ;
    BoardManager.prototype.applyPins = function (basicPieces, kings) {
        for (var _i = 0, SIDES_2 = terms_1.SIDES; _i < SIDES_2.length; _i++) {
            var side = SIDES_2[_i];
            var enemySide = (0, getEnemySide_1.default)(side);
            var enemyKing = kings[enemySide];
            var enemyKingPos = (0, convertPosition_1.default)(enemyKing.position);
            var _loop_1 = function (piece) {
                var _loop_2 = function (fullLine) {
                    var _kingIndex = fullLine.indexOf(enemyKingPos);
                    if (_kingIndex === -1) {
                        return "continue";
                    }
                    ; // Skip the line if the enemy king is not in the legal line of attack
                    //* Check for pin if the enemy king is in the piece's legal line of attack
                    var attackLine = fullLine.filter(function (_, i) { return i < _kingIndex; }); // Trim the line up to the king
                    var pinnedPiece = null; // Temporary variable to store a pinnned piece
                    for (var _e = 0, attackLine_1 = attackLine; _e < attackLine_1.length; _e++) {
                        var _pos = attackLine_1[_e];
                        var destPiece = this_1.boardSquares[_pos].piece;
                        if (!(0, lodash_1.isNull)(destPiece)) {
                            if (destPiece.side === side) {
                                pinnedPiece = null;
                                break;
                            }
                            else {
                                if (pinnedPiece instanceof Piece_1.default) {
                                    //* More than one enemy piece is between the attack, therefore no pin
                                    pinnedPiece = null;
                                    break;
                                }
                                else {
                                    pinnedPiece = destPiece;
                                }
                                ;
                            }
                        }
                        // if (!isNull(destPiece) && destPiece.side !== side) {
                        //   if (pinnedPiece instanceof Piece) {
                        //     //* More than one enemy piece is between the attack, therefore no pin
                        //     pinnedPiece = null;
                        //   } else {
                        //     pinnedPiece = destPiece;
                        //   };
                        // };
                        // if (!isNull(destPiece) && destPiece.side !== side) {
                        //   if (pinnedPiece instanceof Piece) {
                        //     //* More than one enemy piece is between the attack, therefore no pin
                        //     pinnedPiece = null;
                        //   } else {
                        //     pinnedPiece = destPiece;
                        //   };
                        // };
                    }
                    ;
                    if (pinnedPiece) {
                        var regularMoves = pinnedPiece.availableMoves;
                        var pinnedMoves = regularMoves.filter(function (move) {
                            var blocksAttack = attackLine.includes(move);
                            var capturesAttacker = move === (0, convertPosition_1.default)(piece.position);
                            return blocksAttack || capturesAttacker;
                        });
                        pinnedPiece.availableMoves = pinnedMoves;
                    }
                };
                //? Excludes capture lines but given the current state of the game (and in general) works and does not break
                for (var _c = 0, _d = piece.legalLines; _c < _d.length; _c++) {
                    var fullLine = _d[_c];
                    _loop_2(fullLine);
                }
            };
            var this_1 = this;
            for (var _a = 0, _b = basicPieces[side]; _a < _b.length; _a++) {
                var piece = _b[_a];
                _loop_1(piece);
            }
        }
    };
    BoardManager.prototype.commitCastle = function (king, direction) {
        var _this = this;
        var moveRook = function (from, to) {
            var originSquare = _this.boardSquares[from];
            var destSquare = _this.boardSquares[to];
            var originPiece = originSquare.piece;
            originSquare.piece = null;
            destSquare.setPiece(originPiece);
        };
        if (king.side === 'white') {
            if (direction === '+') {
                moveRook('h1', 'f1');
            }
            else {
                moveRook('a1', 'd1');
            }
            ;
        }
        else {
            if (direction === '+') {
                moveRook('h8', 'f8');
            }
            else {
                moveRook('a8', 'd8');
            }
            ;
        }
        ;
    };
    ;
    return BoardManager;
}());
;
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map