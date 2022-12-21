
// Will see if I also incorporate move state
export default class MoveHistoryLL {
  private head: Move = null;

  addMove = (value: string) => {
    this.head = new Move(value, this.head);
  };

  removeLastMove = () => {
    if (this.head !== null) {
      this.head = this.head.prevMove;
    };
  };

  // ?: Depending on if MoveHistoryLL still implements 'Move', then add removeLastTurn so that you can undo not only the last player move, but also the computer move
  // * I just realized that if the player is playing as the black pieces, then the move switch will be odd so I also need to account for that and can't just use the whole turn like I was doing before

  // removeLastTurn = () => {

  // };

  listMoves = (): string[] => {
    const moveList: string[] = [];
    let _head = this.head;

    while (_head !== null) {
      moveList.push(_head.log);
      _head = _head.prevMove;
    };

    return moveList;
  };
};

class Move {
  log: string;
  prevMove: Move | null;

  constructor (moveLog: string, prev = null) {
    this.log = moveLog;
    this.prevMove = prev;
  };
};
