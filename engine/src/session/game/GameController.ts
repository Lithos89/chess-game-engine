
// Core
import { isNull, isEqual } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition } from 'logic/Terms';

// Classes
import Game from './Game';

class GameController extends Game {
  private selectedSquarePos: ShortPosition | null = null;

  public selectPiece(position: ShortPosition) {
    const newSelection = isNull(this.selectedSquarePos)

    //* Selecting a square while no square is highlighted
    if (newSelection) {
      const didHighlight = this.highlightPiece(position);
      
      if (didHighlight) 
        this.selectedSquarePos = position;


    //* Selecting the same square or a new square, triggering unhighlighting
    } else {
      const didUnhighlight = !(this.highlightPiece());

      if (didUnhighlight)
        this.selectedSquarePos = null;
    }
  };

  // TODO: Add more to this function
  public requestMove(from: ShortPosition, to: ShortPosition): boolean {
    if (from !== to) {
      return this.move(from, to);
    } else {
      return false;
    }
  };

  // TODO: Add more to this function
  public requestUndo() {
    this.undo();
  }
};

export default GameController;
