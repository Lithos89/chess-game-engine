
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { type Side, type ShortPosition, PieceKind } from 'logic/terms';

// Components
import Piece from '../../components/piece/Piece';

// Game Management
import Game from './Game';

class GameController extends Game {
  private selectedSquarePos: ShortPosition | null = null;

  constructor(side: Side, id: string) {
    super(side, id)
    this.signalState('move-controller', {
      selectSquare: this.selectSquare,
      move: this.move,
      undo: this.requestUndo,
    })
  };

  // public promotionSelection = (piece: Exclude<PieceKind, ['k','p']>): Piece => {
  //   let newPiece: Piece;
  //   switch(piece) {
  //     case PieceKind.Bishop:
  //       return PieceKind.Bishop;
  //     case PieceKind.Knight:
  //       return PieceKind.Knight;
  //     case PieceKind.Queen:
  //       return PieceKind.Queen;
  //     case PieceKind.Rook:
  //       return PieceKind.Rook;

  //   };
  // };

  // *: Move highlighting management for selecting/deselecting a square with a piece
  public selectSquare = (position: ShortPosition) => {
    console.info(position);
    const isNewSelection = isNull(this.selectedSquarePos);

    //* Selecting a square while no square is highlighted
    if (isNewSelection) {
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
  public move = (from: ShortPosition, to: ShortPosition): boolean => {
    if (from !== to) {
      return this.attemptMove(from, to);
    } else {
      return false;
    };
  };

  // TODO: Add more to this function
  public requestUndo = () => {
    this.undo();
  };
};

export default GameController;
