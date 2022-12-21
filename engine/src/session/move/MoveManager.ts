import Piece from '../../components/piece';
import { PieceKind, type Side, type ShortPosition, SIDES } from '../../logic/Terms';

// Types, interfaces, constants, ...
// import { type ShortPosition } from '../../logic/Terms';
// import { BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
import Square from 'components/Square';

// Classes
import MoveHistoryLL from './MoveHistoryLL';
import BoardManager from '../board/BoardManager';

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
    console.log(this.moveLL.listMoves());

    // ?: Will also update the board with the new state reflecting the takeback
    // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
  };

  public getMoveHistory = () => {
    // !: Need to clean this up
    const tempList = this.moveLL.listMoves().reverse().map((v, i, arr) => {
      const isEven = i % 2 === 0;
      if (isEven) {
        if (arr[i+1] !== 'undefined') {
          return [arr[i], arr[i+1]];
        } else {
          return [arr[i], ''];
        };
      };
    }).filter((v) => v !== undefined);

    return tempList
  };

  private capture = (piece: Piece) => {
    console.log(piece.side)
    this.captures[SIDES[1 - SIDES.indexOf(piece.side)]][piece.kind] += 1;
    this.updateState('capture');
  }

  public commitMove = (origin: Square, dest: Square): void => {
    const originPiece = origin.piece;
    origin.piece = null;

    // destpiece will be used when it comes to reflecting captures
    const destPiece = dest.piece;

    if (destPiece !== null)
      this.capture(destPiece)

    this.moveLL.addMove(originPiece.logMove(convertPosition(dest.position) as ShortPosition, !!destPiece));

    this.updateState('move-log');

    dest.setPiece(originPiece);

    // this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
    console.log(this.moveLL.listMoves());
    this.updateState('board');
  };
};

export default MoveManager;
