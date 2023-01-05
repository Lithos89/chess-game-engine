
import { isEmpty, isNull } from 'lodash';

// Types, interfaces, constants, ...
import { PieceKind, type Side, type ShortPosition, SIDES } from '../../logic/terms';
import { BoardSquareListings } from '../../formation/structure/squareCollection';
import { MoveLine } from '../../logic/algorithms/types';

// Components
import Square from '../../components/Square';
import Piece, { King } from '../../components/piece';

// Classes
import MoveHistoryLL from './MoveHistoryLL';
import EventManager from '../game/EventManager';

// Util
import { convertPosition } from '../../utils';

interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine
};

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
class MoveManager {
  public readonly moveLL: MoveHistoryLL = new MoveHistoryLL();

  public captures: {[_side in Side]: {[_piece in Exclude<PieceKind, 'k'>] : number}} = {
    white: { p: 0, r: 0, h: 0, b: 0, q: 0},
    black: { p: 0, r: 0, h: 0, b: 0, q: 0},
  };

  constructor(
    private updateState: (type?: string) => void
  ) {};

  public takebackMove = () => {
    this.moveLL.removeLastMove();
    console.info(this.moveLL.listMoves());

    // ?: Will also update the board with the new state reflecting the takeback
    // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
  };

  public getMoveHistory = () => {
    const moveList = this.moveLL.listMoves();
    const moveListAscending = moveList.reverse();
    // !: Need to clean this up
    const compiledMoves = moveListAscending.map((v, i, arr) => {
      const isEven = i % 2 === 0;
      if (isEven) {
        if (arr[i+1] !== 'undefined') {
          return [arr[i], arr[i+1]];
        } else {
          return [arr[i], ''];
        };
      };
    }).filter((v) => v !== undefined);

    return compiledMoves
  };

  private capture = (piece: Piece) => {
    this.captures[SIDES[1 - SIDES.indexOf(piece.side)]][piece.kind] += 1;
    this.updateState('capture');
  }

  // Idea for algorithm to find out if a piece is pinned
  /*
    For each piece, go through it's line of attack and see if the queen is in part of the line. Then if the queen is a part of that line
    go through all the squares bettween the piece and the queen. Then count the number of pieces that are between the two.
    If there is more than one piece, then restrict the pinned pieces moves to those that are between the two pieces.
  */

  public commitMove = (origin: Square, dest: Square): void => {
    const originPiece = origin.piece;
    origin.piece = null;

    const destPiece = dest.piece;

    if (destPiece !== null)
      this.capture(destPiece)

    this.moveLL.addMove(originPiece.logMove(convertPosition(dest.position) as ShortPosition, !!destPiece));

    this.updateState('move-log');

    if (originPiece.isMultiBehavioral() && originPiece.moved === false)
      originPiece.moved = true;

    dest.setPiece(originPiece);

    // this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
    // console.log(this.moveLL.listMoves());
    this.updateState('board');
  };

  // *: Loops over each square on the board to update each piece with their respective available moves
  public updateMoves = (board: BoardSquareListings, sideLastMoved?: Side) => {
    //* King related stuff
    const checks: Attack[] = [];

    const whiteControlled: Set<ShortPosition> = new Set();
    const blackControlled: Set<ShortPosition> = new Set();
    const protectedPieces: Piece[] = [];

    // TODO: See if I am better able to handle this logic so taht I don't have to store the kings in a variable
    let whiteKing: King;
    let blackKing: King;

    //*

    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece)) { continue };

      if (piece.kind === PieceKind.King) {
        if (piece.side === 'white')
          whiteKing = piece as King;
        else if (piece.side === 'black') {
          blackKing = piece as King;
        };
        continue;
      };

      // Reset the protection of the piece if it is not already set to be protected across this update
      if (!protectedPieces.includes(piece))
        piece.isProtected = false;


      const pieceSide = piece.side;
      const playableLines: MoveLine[] = [];
      const altCapturing = !isEmpty(piece.captureAlgorithms); // If a piece can still move there without capturing

      for (const legalLine of piece.legalLines) { 
        const playableLine: MoveLine = [];

        for (const linePos of legalLine) {
          const squareIsEmpty: boolean = board[linePos].piece === null;
          const simpleCaptureAvailable: boolean = board[linePos].piece?.side !== pieceSide && !altCapturing;

          if (squareIsEmpty) {
            if (piece.kind !== PieceKind.Pawn) {
              if (piece.side === "white") {
                whiteControlled.add(linePos);
              } else {
                blackControlled.add(linePos);
              };
            };
            playableLine.push(linePos);
          } else if (simpleCaptureAvailable) {
            if (board[linePos].piece?.kind === PieceKind.King) {
              checks.push({ attackPiece: piece, frontAttackLine: playableLine });
            } else {
              playableLine.push(linePos);
            }
              break;
          } else {
            if (piece.kind !== PieceKind.Pawn) {
              board[linePos].piece.isProtected = true;
              protectedPieces.push(board[linePos].piece);
            }
            break;
          }
        };
        
        playableLines.push(playableLine);
      };

      if (altCapturing) {
        for (const captureLine of piece.captureLines) {
          const playableLine: MoveLine = [];

          for (const linePos of captureLine) {
            if (board[linePos].piece !== null && board[linePos].piece.side !== pieceSide) {
              playableLine.push(linePos);
            } else {
              if (board[linePos].piece) {
                board[linePos].piece.isProtected = true;
                protectedPieces.push(board[linePos].piece);
              } else {
                if (piece.side === "white") {
                  whiteControlled.add(linePos);
                } else {
                  blackControlled.add(linePos);
                };
              };
              break;
            };
          };

          playableLines.push(playableLine);
        };
      };

      piece.availableMoves = playableLines.flat();
    };

    //* King Updating

    const updateKing = function (king: King, controlledSquares: Set<ShortPosition>) {
      const playableLines: MoveLine[] = [];

      for (const legalLine of king.legalLines) { 
        const playableLine: MoveLine = [];

        for (const linePos of legalLine) {
          const squareIsEmpty: boolean = board[linePos].piece === null;
          const simpleCaptureAvailable: boolean = !isNull(board[linePos].piece) && board[linePos].piece?.side !== king.side;

          if (squareIsEmpty && !controlledSquares.has(linePos) ) {
            if (king.side === "white") {
              if (!blackKing.legalLines.flat(2).includes(linePos)) {
                playableLine.push(linePos);
              }
            } else {
              if (!whiteKing.legalLines.flat(2).includes(linePos)) {
                playableLine.push(linePos);
              }
            }
          } else if (simpleCaptureAvailable) {
            if (!board[linePos].piece?.isProtected) {
              playableLine.push(linePos);
            }
            break;
          } else {
            if (board[linePos].piece) {
              board[linePos].piece.isProtected = true;
              protectedPieces.push(board[linePos].piece);
            };
            break;
          }
        };
        
        playableLines.push(playableLine);
      };

      king.availableMoves = playableLines.flat();
    }

    updateKing(whiteKing, blackControlled);
    updateKing(blackKing, whiteControlled)

    //* Check / Checkmate related
    if (!isEmpty(checks) && sideLastMoved) {
      const isCheckmate = checks.map((attack) => EventManager.forceCheckResolve(board, attack, sideLastMoved)).some(Boolean);

      if (isCheckmate) {
        console.info("Checkmate");
      } else {
        console.info("Check");
      }
    }
    this.updateState('board');
  };


  public tempUpdateMoves(board: BoardSquareListings, sideLastMoved?: Side) {

    const basicPieces: { [side in Side]: Piece[] } = {
      white: [],
      black: []
    };
    const kings: { [side in Side]? : King} = {};

    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece)) { continue };

      if (piece.kind === PieceKind.King) {
        if (piece.side === 'white')
          kings.white = piece as King;
        else if (piece.side === 'black') {
          kings.black = piece as King;
        };
      } else {
        if (piece.side === 'white')
          basicPieces.white.push(piece);
        else if (piece.side === 'black') {
          basicPieces.black.push(piece);
        };
      };
    };

    // White
    const [whiteChecks, whiteControlled] = this.tempUpdateSideBasicPieces(board, basicPieces.white, "white");

    // Black
    const [blackChecks, blackControlled] = this.tempUpdateSideBasicPieces(board, basicPieces.black, "black");

    this.tempUpdateKings(board, kings as { [side in Side] : King}, { white: whiteControlled, black: blackControlled} as {[side in Side]: Set<ShortPosition>});

    const checks = sideLastMoved === "white" ? Array.from(whiteChecks) : Array.from(blackChecks);

    if (!isEmpty(checks) && sideLastMoved) {
      const isCheckmate = (checks).map((attack) => EventManager.forceCheckResolve(board, attack, sideLastMoved)).some(Boolean);

      if (isCheckmate) {
        console.info("Checkmate");
      } else {
        console.info("Check");
      }
    }
    this.updateState('board');
  };

  private tempUpdateSideBasicPieces = (board: BoardSquareListings, pieces: Piece[], side: Side) => {
    const checks = [];
    const controlledSquares: Set<ShortPosition> = new Set();
    const protectedPieces: Piece[] = [];

    for (const piece of pieces){
      if (!protectedPieces.includes(piece))
          piece.isProtected = false;


      const playableLines: MoveLine[] = [];
      const altCapturing = !isEmpty(piece.captureAlgorithms); // If a piece can still move there without capturing

      for (const legalLine of piece.legalLines) { 
        const playableLine: MoveLine = [];

        for (const linePos of legalLine) {
          const squareIsEmpty: boolean = board[linePos].piece === null;
          const simpleCaptureAvailable: boolean = board[linePos].piece?.side !== side && !altCapturing;

          if (squareIsEmpty) {
            if (piece.kind !== PieceKind.Pawn) {
              controlledSquares.add(linePos)
            };
            playableLine.push(linePos);
          } else if (simpleCaptureAvailable) {
            if (board[linePos].piece?.kind === PieceKind.King) {
              checks.push({ attackPiece: piece, frontAttackLine: playableLine });
            } else {
              playableLine.push(linePos);
            }
              break;
          } else {
            if (piece.kind !== PieceKind.Pawn) {
              board[linePos].piece.isProtected = true;
              protectedPieces.push(board[linePos].piece);
            }
            break;
          }
        };
        
        playableLines.push(playableLine);
      };

      if (altCapturing) {
        for (const captureLine of piece.captureLines) {
          const playableLine: MoveLine = [];

          for (const linePos of captureLine) {
            if (board[linePos].piece !== null && board[linePos].piece.side !== side) {
              playableLine.push(linePos);
            } else {
              if (board[linePos].piece) {
                board[linePos].piece.isProtected = true;
                protectedPieces.push(board[linePos].piece);
              } else {
                controlledSquares.add(linePos);
              };
              break;
            };
          };

          playableLines.push(playableLine);
        };
      };

      piece.availableMoves = playableLines.flat();
    };

    return [checks, controlledSquares];
  }

  private tempUpdateKings = (board: BoardSquareListings, kings: { [side in Side] : King}, controlledSquares: { [side in Side] : Set<ShortPosition>}) => {
    for (const i in SIDES) {
      const side = SIDES[i];
      const king = kings[side];

      const enemySide = SIDES[1 - Number(i)];
      const enemyKing = kings[enemySide];

      const playableLines: MoveLine[] = [];

      for (const legalLine of king.legalLines) { 
        const playableLine: MoveLine = [];

        for (const linePos of legalLine) {
          const squareIsEmpty: boolean = board[linePos].piece === null;
          const simpleCaptureAvailable: boolean = !isNull(board[linePos].piece) && board[linePos].piece?.side !== king.side;

          if (squareIsEmpty && !controlledSquares[enemySide].has(linePos)) {
            if (!enemyKing.legalLines.flat(2).includes(linePos)) {
              playableLine.push(linePos);
            }
          } else if (simpleCaptureAvailable) {
            if (!board[linePos].piece?.isProtected) {
              playableLine.push(linePos);
            }
            break;
          } else {
            if (board[linePos].piece) {
              board[linePos].piece.isProtected = true;
              // protectedPieces.push(board[linePos].piece);
            };
            break;
          }
        };
        
        playableLines.push(playableLine);
      };

      king.availableMoves = playableLines.flat();

      // return protectedPieces
    }
  };
};

export default MoveManager;
