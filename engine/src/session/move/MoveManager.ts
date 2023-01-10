
import { isEmpty, isNull, isUndefined } from 'lodash';

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
import { convertPosition, sortPieces } from '../../utils';

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
    For each piece, go through it's line of attack and see if the king is in part of the line. Then if the king is a part of that line
    go through all the squares bettween the piece and the king. Then count the number of pieces that are between the two.
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
  public updateMoves(board: BoardSquareListings, sideLastMoved?: Side) {
    const [basicPieces, kings] = sortPieces(board);

    const [whiteChecks, whiteControlled] = this.updateSideBasicPieces(board, basicPieces.white, "white");
    const [blackChecks, blackControlled] = this.updateSideBasicPieces(board, basicPieces.black, "black");

    // Kings are updated after basic pieces to make sure that a king cannot move into a line of check and if it is already in check
    this.updateKings(board, kings as { [side in Side] : King}, { white: whiteControlled, black: blackControlled} as {[side in Side]: Set<ShortPosition>});

    //? Could add a pin updating function here that takes the kings and the other pieces and loops over all of the basic pieces to detect pins

    const checks = sideLastMoved === "white" ? whiteChecks : blackChecks;

    if (!isEmpty(checks) && !isUndefined(sideLastMoved)) {
      const isCheckmate = (Array.from(checks)).map((attack) => EventManager.forceCheckResolve(board, attack, sideLastMoved)).some(Boolean);

      if (isCheckmate) {
        console.info("Checkmate");
      } else {
        console.info("Check");
      }
    }
    this.updateState('board');
  };

  private loopLines = (moveLines: MoveLine[], isSquareOccupied: (linePos) => boolean, emptySquareCallback: ((linePos: ShortPosition) => boolean), occupiedSquareCallback: (linePos: ShortPosition, playableLine?: MoveLine) => boolean) => {
    const playableLines: MoveLine[] = [];

    for (const moveLine of moveLines) { 
      const playableLine: MoveLine = [];

      // * Further line search is stopped when a piece is detected, resulting in [empty..., capture?]
      for (const linePos of moveLine) {
        if (isSquareOccupied(linePos)) {
          const captureAvailable = occupiedSquareCallback(linePos, playableLine);
          if (captureAvailable)
            playableLine.push(linePos);

          break;
        } else {
          const moveAvailable = emptySquareCallback(linePos);
          if (moveAvailable)
            playableLine.push(linePos);
        };
      };
      playableLines.push(playableLine);
    };

    return playableLines.flat();
  };


  private updateSideBasicPieces = (board: BoardSquareListings, pieces: Piece[], side: Side): [Attack[], Set<ShortPosition>] => {
    const checks: Attack[] = [];
    const controlledSquares: Set<ShortPosition> = new Set();
    const protectedPieces: Piece[] = [];

    const doesPieceExist = (pos: ShortPosition) => !(board[pos].piece === null);
      
    const emptySquareCallback = (piece: Piece) => (linePos: ShortPosition) => {
      if (piece.kind !== PieceKind.Pawn) {
        controlledSquares.add(linePos);
      };
      return true;
    };

    const occupiedSquareCallback = (piece: Piece) => (linePos: ShortPosition, playableLine: MoveLine) => {
      const destPiece: Piece | null = board[linePos].piece;
      const altCapturing = !isEmpty(piece.captureAlgorithms); // If a piece can still move there without capturing
      const simpleCaptureAvailable: boolean = destPiece?.side !== side && !altCapturing;

      if (simpleCaptureAvailable) {
        if (destPiece?.kind === PieceKind.King) {
          checks.push({ attackPiece: piece, frontAttackLine: playableLine });
        } else {
          return true;
        };
      } else {
        if (piece.kind !== PieceKind.Pawn) {
          destPiece.isProtected = true;
          protectedPieces.push(destPiece);
        };
      };
      return false; 
    };

    for (const piece of pieces){
      piece.availableMoves = []; // Reset piece moveset
      const newMoves: ShortPosition[] = [];

      if (!protectedPieces.includes(piece))
          piece.isProtected = false;
      
      const regularMoves = this.loopLines(
        piece.legalLines,
        doesPieceExist,
        emptySquareCallback(piece),
        occupiedSquareCallback(piece)
      );

      newMoves.push(...regularMoves);

      if (!isEmpty(piece.captureAlgorithms)) {
        const captureMoves = this.loopLines(
          piece.captureLines,
          doesPieceExist,
          (linePos) => {
            controlledSquares.add(linePos);
            return false;
          }, 
          (linePos, playableLine) => {
            if (board[linePos].piece.side !== side) {
              if (board[linePos].piece?.kind === PieceKind.King) {
                checks.push({ attackPiece: piece, frontAttackLine: playableLine });
                return false;
              } else {
                return true;
              }
            } else {
              board[linePos].piece.isProtected = true;
              protectedPieces.push(board[linePos].piece);
              return false;
            };
          }
        );

        newMoves.push(...captureMoves);
      };

      piece.availableMoves = newMoves;
    };

    return [checks, controlledSquares];
  };

  private updateKings = (board: BoardSquareListings, kings: { [side in Side] : King}, controlledSquares: { [side in Side] : Set<ShortPosition>}) => {
    
    const doesPieceExist = (pos: ShortPosition) => !(board[pos].piece === null);

    const occupiedSquareCallback = (king: King) => (linePos: ShortPosition) => {
      const destPiece: Piece | null = board[linePos].piece;
      const simpleCaptureAvailable: boolean = !isNull(destPiece) && destPiece?.side !== king.side;

      if (simpleCaptureAvailable) {
        if (!destPiece?.isProtected) {
          return true;
        };
      } else {
        if (destPiece)
          board[linePos].piece.isProtected = true;
      };

      return false;
    };
    
    for (const i in SIDES) {
      const side = SIDES[i];
      const king = kings[side];

      const enemySide = SIDES[1 - Number(i)];
      const enemyKing = kings[enemySide];

      king.availableMoves = [];

      const newMoves: ShortPosition[] = [];

      const emptySquareCallback = (linePos: ShortPosition): boolean => {
        if (!controlledSquares[enemySide].has(linePos)) {
          if (!enemyKing.legalLines.flat(2).includes(linePos)) {
            return true;
          };
        };
        return false;
      };

      const moves = this.loopLines(
        king.legalLines,
        doesPieceExist,
        emptySquareCallback,
        occupiedSquareCallback(king),
      );

      newMoves.push(...moves);

      king.availableMoves = newMoves;
    };
  };
};

export default MoveManager;
