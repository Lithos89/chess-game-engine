
// Types, interfaces, constants, ...
// import { type ShortPosition } from '../../logic/Terms';
// import { BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
import Square from 'components/Square';

// Classes
import MoveHistoryLL from './MoveHistoryLL';
import BoardManager from '../board/BoardManager';


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
  private readonly moveLL: MoveHistoryLL = new MoveHistoryLL();

  constructor(private boardManager: BoardManager) {};

  public takebackMove = () => {
    this.moveLL.removeLastMove();
    console.log(this.moveLL.listMoves());

    // ?: Will also update the board with the new state reflecting the takeback
    // ?: Also, most likely since the player will be versing a bot, the function will take back the last two moves.
  };

  public commitMove = (origin: Square, dest: Square): void => {
    const originPiece = origin.piece;
    origin.piece = null;

    // destpiece will be used when it comes to reflecting captures
    const destPiece = dest.piece;

    dest.setPiece(originPiece);

    this.moveLL.addMove(originPiece.side + ' ' + originPiece.kind + ' ' + originPiece.position.col + originPiece.position.row);
    console.log(this.moveLL.listMoves());

    // TODO: Add some callback that will then update the client with the new board rather than returning like the primitive iteration
    this.boardManager.notifyBoardUpdated();
  };
};

export default MoveManager;
