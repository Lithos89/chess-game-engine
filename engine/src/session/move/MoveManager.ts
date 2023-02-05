
// Types, interfaces, constants, ...
import { type Side, type ShortPosition, type BoardDirection, PieceKind } from '../../logic/terms';

// Components
import Square from '../../components/Square';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';
import Pawn from '../../components/piece/Pawn';

// Classes
import MoveHistoryLL from './MoveHistoryLL';

// Utils
import convertPosition from '../../utils/regulation/position/convertPosition';
import calcDistance from '../../utils/regulation/position/calcDistance';
import getBoardDirection from '../../utils/regulation/direction/getBoardDirection';
import createPiece from '../../utils/piece/createPiece';
import getEnemySide from '../../utils/regulation/side/getEnemySide';

//*: Functions to include in this class
/*
  - Victory check
  - "Check" check
  - Draw check
    - 3 Repeated Move check
    - Insufficient Material Check
*/

// *: The purpose of MoveManager will be to keep track of available moves, forced plays, signal someone has won, execute legal moves, and more...
class MoveManager {
  public readonly moveLL: MoveHistoryLL = new MoveHistoryLL();

  public captures: {[_side in Side]: {[_piece in Exclude<PieceKind, 'k'>] : number}} = {
    white: { p: 0, r: 0, h: 0, b: 0, q: 0},
    black: { p: 0, r: 0, h: 0, b: 0, q: 0},
  };

  constructor(
    private updateState: (type?: string) => void,
    private commitCastle: (king: King, direction: BoardDirection) => void
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
    this.captures[getEnemySide(piece.side)][piece.kind] += 1;
    this.updateState('capture');
  }

  public commitMove = (origin: Square, dest: Square): void => {
    const originPiece = origin.piece;
    origin.piece = null;

    const capturedPiece = dest.piece;

    if (capturedPiece !== null)
      this.capture(capturedPiece)

    this.moveLL.addMove(originPiece.logMove(convertPosition(dest.position) as ShortPosition, !!capturedPiece));
    this.updateState('move-log');

    if (originPiece.isMultiBehavioral() && originPiece.moved === false)
      originPiece.moved = true;

    if (originPiece instanceof King && calcDistance(origin, dest) > 1) {
      const castleDirection = getBoardDirection(origin.position, dest.position, "horizontal");
      dest.setPiece(originPiece);
      this.commitCastle(originPiece, castleDirection);
    } else if (originPiece instanceof Pawn && ["1", "8"].includes(dest.position.row)) {
      const promotedPawn = createPiece(PieceKind.Queen, originPiece.side);
      dest.setPiece(promotedPawn);
    } else {
      dest.setPiece(originPiece);
    }

    // this.updateState('board');
    this.updateState();
  };

  // public transferPiece(origin: Square, dest: Square) {
  //   const originPiece = origin.piece;
  //   origin.removePiece();

  //   dest.setPiece(originPiece);
  // }
};

export default MoveManager;
