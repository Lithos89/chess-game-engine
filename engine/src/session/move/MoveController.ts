
// Types, interfaces, constants, ...
import { ShortPosition } from "logic/Terms";
import { BoardSquareListings } from '../../formation/structure/squareCollection';

import Piece from 'components/pieces';

/*
  This is the class that will be used to communicate with the move manager,
  therefore being able to seperate the move logic with the move callbacks
*/
class MoveController {
  boardPositions: BoardSquareListings;
  private commitMove;
  private highlightBoard;
  private selectedPiece: Piece;
  undo: () => void;

  constructor(boardPositions: BoardSquareListings, commitMove, highlightBoard, takebackMove: () => void) {
    this.boardPositions = boardPositions;
    this.commitMove = commitMove;
    this.highlightBoard = highlightBoard;
    this.undo = takebackMove;
  };

  selectPiece = (position: ShortPosition) => {
    const newSelectedPiece = this.boardPositions[position]?.piece;

    if (newSelectedPiece && newSelectedPiece !== this.selectedPiece) { 
      // Highlight board with the selected piece and keep track of the piece for 
      this.highlightBoard(newSelectedPiece);
      this.selectedPiece = newSelectedPiece;
    } else {
      // Unhighlight board and reset highlighted piece pointer
      this.highlightBoard();
      this.selectedPiece = null;
    }
  }

  requestMove = (from: ShortPosition, to: ShortPosition): boolean => {
    const originPiece = this.boardPositions[from]?.piece;

    // destpiece will be used when it comes to reflecting captures
    const destPiece = this.boardPositions[to]?.piece;

    try {
      if (from === to) { throw Error }
      // this.boardPositions[to].piece = originPiece;
      // this.boardPositions[from].piece = null;

      this.commitMove(from, to);
    } catch {
      return false;
    } finally {
      // Here you will comit the move to the MoveManager using a commitMove method
      // this.commitMove()
      return true;
    }

    // TODO: Add filter functions here that will evaluate if it is a viable move
  }
};

export default MoveController
