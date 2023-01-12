
// Types, interfaces, constants, ...
import { PieceKind, type Side, type ShortPosition, SIDES } from '../../logic/terms';
import { type MoveLine } from '../../logic/algorithms/types';

// Components
import Square from '../../components/Square';
import Piece from '../../components/piece';

// Classes
import MoveHistoryLL from './MoveHistoryLL';

// Util
import convertPosition from '../../utils/position/convertPosition';

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
};

export default MoveManager;
