
// Types, interfaces, constants, ...
import { boardPositions, PieceKind, type ShortPosition, type Side } from '../../logic/Terms';
import { type PieceListings, PieceListing } from '../../formation/structure/pieceCollection';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
import Square, { type SquareColor } from '../../components/Square';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../components/pieces';

// Controllers, Managers, Observers
import Observer from '../../observers/Observer';
import Observable from 'observers/interfaces/observable';

class BoardManager implements Observable {
  boardSquares: BoardSquareListings = {};
  observer: Observer<BoardManager>;
  private readonly getCurrentTurnSide: () => Side;

  constructor(startingFormation: PieceListings, currentTurnSideCallback: () => Side) {
    this.observer = new Observer(this);
    this.getCurrentTurnSide = currentTurnSideCallback;
    this.initializeBoard(startingFormation);
    
    this.signalState();
  };

  // TODO: Fix the paramters so that it tracks the different highlighted action type
  compileBoard = (highlightedSquarePositions: ShortPosition[] = []): BoardSquareCondensed[] => {
    const processedBoard: BoardSquareCondensed[] = [];

    for (const position in this.boardSquares) {
      processedBoard.push({
        position: position as ShortPosition,
        square: {
          color: this.boardSquares[position].color,
          focus: {
            highlighted: highlightedSquarePositions.includes(position as ShortPosition),
            action: highlightedSquarePositions.includes(position as ShortPosition) ? 'move' : null,
          },
        },
        piece: 
          this.boardSquares[position].piece ? 
          {
            kind: this.boardSquares[position].piece.kind,
            side: this.boardSquares[position].piece.side,
          }: null
      });
    };

    return processedBoard;
  };

  signalState = (params = []) => {
    const boardState = this.compileBoard(params);
    this.observer.commitState(boardState);
  };

  // TODO: Make this the single function that calls signalState and have this func be called instead to updateBoard
  updateBoard = () => {
    this.signalState();
  }
  
  // board highlighting will be acomplished here as well through state updates that will affect boardSquares
  highlightAvailableSquares = (piece?: Piece) => {
    if (piece instanceof Piece) {
      if (piece.side === this.getCurrentTurnSide()) {
        this.signalState(piece.availableMoves);
      }
    } else {
      this.signalState();
    };
  };

  private createPiece({ kind, side }: PieceListing): Piece | null {
    switch (kind) {
      case PieceKind.Pawn:
        return new Pawn(side);
      case PieceKind.Rook:
        return new Rook(side);
      case PieceKind.Knight:
        return new Knight(side);
      case PieceKind.Bishop:
        return new Bishop(side);
      case PieceKind.Queen:
        return new Queen(side);
      case PieceKind.King:
        return new King(side);
      // TODO: Assign this with the never typescript property
      default:
        return null;
    };
  };

  // TODO: replace orientationflipped with the side that the player is on defaulting to white
  private initializeBoard(boardConfiguration: PieceListings, side: Side = 'white') {
    // ?: If I include a board flipping function, do it here and pass the new positions to initializeSquares?
    this.initializeSquares(boardConfiguration);
  };

  private initializeSquares(pieceMapping: PieceListings) {
    for (const tileIndex in boardPositions) {
      const position: ShortPosition  = boardPositions[tileIndex];

      const regex: RegExp = /b|d|f|h/;
      const isEvenRow: Boolean = regex.test(position);

      const initialPiece: Piece | null = (typeof pieceMapping[position] === 'object') ? this.createPiece(pieceMapping[position]) : null;

      const squareColor: SquareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
      const square: Square = new Square(position, squareColor, initialPiece);

      this.boardSquares[position] = square;
    };
  };
};

export default BoardManager;
