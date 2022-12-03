// Types, interfaces, constants, ...
import { ShortPosition } from "logic/Terms";
import Movable from "./interfaces/Movable";

// Components
import Square from "components/Square";

// Utils
import { convertPosition } from "utils";

/*
  This is the class that will be used to communicate with the move manager,
  therefore being able to seperate the move logic with the move callbacks
*/
class MoveController {
  boardPositions: { [shortPosition: string] : Square }

  constructor(boardPositions: { [shortPosition: string] : Square }) {
    this.boardPositions = boardPositions
  }

  trackBackward = () => {

  }

  trackForward = () => {

  };

  commitMove = (piece: Movable) => {
    piece.move()
  }

  requestMove = (from: ShortPosition, to: ShortPosition) => {
    const originPiece = this.boardPositions[from]?.piece
    // const destPiece = this.boardSquares[to]?.piece

    this.boardPositions[to].piece = originPiece;
    delete this.boardPositions[from].piece

    // TODO: Add filter functions here that will evaluate if it is a viable move
  }

  moveRequestCallback = (origin: Square, dest: Square) => {
    const originPosShort: ShortPosition = convertPosition(origin.position) as ShortPosition;
    const destPosShort: ShortPosition = convertPosition(dest.position) as ShortPosition;

    const originPiece = origin.piece
    // const destPiece = this.boardSquares[to]?.piece

    const goTo = this.boardPositions['d4']
    console.info(goTo)
    goTo.setPiece(originPiece);
    delete origin.piece;
    return this.boardPositions;
  };
};

export default MoveController
