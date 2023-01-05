
import { isEmpty, isNull } from 'lodash';

// Types, interfaces, constants, ...
import { PieceKind, type Side, type ShortPosition, SIDES } from '../../logic/terms';
import { BoardSquareListings } from '../../formation/structure/squareCollection';
import { MoveLine } from 'logic/algorithms/types';

// Components
import Square from 'components/Square';
import Piece from '../../components/piece';

// Classes
import MoveHistoryLL from './MoveHistoryLL';
import EventManager from '../game/EventManager';

// Util
import { convertPosition } from '../../utils';


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
  public updateMoves = (board: BoardSquareListings) => {
    const checks = []

    const protectedPieces = [];

    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece)) { continue };

      if (!protectedPieces.includes(piece)) piece.isProtected = false;

      const pieceSide = piece.side;
      const playableLines: MoveLine[] = [];
      const uniqueCapturing = !isEmpty(piece.captureAlgorithms); // Piece can still move there without capturing

      for (const legalLine of piece.legalLines) { 
        const playableLine: MoveLine = [];

        for (const linePos of legalLine) {
          const squareIsEmpty: boolean = board[linePos].piece === null;
          const simpleCaptureAvailable: boolean = board[linePos].piece?.side !== pieceSide && !uniqueCapturing;

          if (squareIsEmpty) {
            playableLine.push(linePos);
          } else if (simpleCaptureAvailable) {
            if (board[linePos].piece?.kind === PieceKind.King) {
              checks.push({ attackPiece: piece, frontAttackLine: playableLine, fullAttackLine: legalLine})
            } else {
              if (piece.kind === PieceKind.King) {
                if (!board[linePos].piece.isProtected) {
                  playableLine.push(linePos);
                }
              } else {
                playableLine.push(linePos);
              }
            }
              break;
          } else {
            board[linePos].piece.isProtected = true;
            protectedPieces.push(board[linePos].piece);
            break;
          }
        };
        
        playableLines.push(playableLine);
      };

      if (uniqueCapturing) {
        for (const captureLine of piece.captureLines) {
          const playableLine: MoveLine = [];

          for (const linePos of captureLine) {
            if (board[linePos].piece !== null && board[linePos].piece.side !== pieceSide) {
              playableLine.push(linePos);
            } else {
              if (board[linePos].piece) {
                board[linePos].piece.isProtected = true;
                protectedPieces.push(board[linePos].piece);
              }
              break;
            };
          };

          playableLines.push(playableLine);
        };
      };

      piece.availableMoves = playableLines.flat();
    };

    if (!isEmpty(checks)) {
      const isCheckmate = checks.map((v, i) => EventManager.forceCheckResolve(board, v, "white")).some(Boolean);

      if (isCheckmate) {
        console.info("Checkmate");
      } else {
        console.info("Check")
      }
    }
    this.updateState('board');
  };
};

export default MoveManager;
