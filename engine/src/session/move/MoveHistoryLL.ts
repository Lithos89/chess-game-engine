
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

  listMoves = (): string[] => {
    const moveList: string[] = [];
    let _head = this.head;

    while (_head !== null) {
      moveList.push(_head.log);
      _head = _head.prevMove;
    }

    return moveList;
  }
}

class Move {
  log: string;
  prevMove: Move | null

  constructor (moveLog: string, prev = null) {
    this.log = moveLog
    this.prevMove = prev
  }
};
