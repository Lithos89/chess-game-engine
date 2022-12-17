
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition } from 'logic/Terms';

// Classes
import Game from './Game';

class GameController extends Game {
  private selectedSquarePos: ShortPosition | null = null;

  // *: 
  public selectSquare(position: ShortPosition) {
    console.log(position);
    const newSelection = isNull(this.selectedSquarePos);

    //* Selecting a square while no square is highlighted
    if (newSelection) {
      const didHighlight = this.attemptHighlight(position);
      
      if (didHighlight) 
        this.selectedSquarePos = position;


    //* Selecting the same square or a new square, triggering unhighlighting
    } else {
      const didUnhighlight = this.attemptHighlight();

      if (didUnhighlight)
        this.selectedSquarePos = null;
    };
  };

  // TODO: Add more to this function
  public move(from: ShortPosition, to: ShortPosition): boolean {
    if (from !== to) {
      return this.attemptMove(from, to);
    } else {
      return false;
    };
  };

  // TODO: Add more to this function
  public requestUndo() {
    this.undo();
  };
};

export default GameController;
