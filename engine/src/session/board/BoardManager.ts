
// Types, interfaces, constants, ...
import { BOARD_POSITIONS, PieceKind, type ShortPosition, type Side } from '../../logic/Terms';
import { type PieceListings, PieceListing } from '../../formation/structure/pieceCollection';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
import Square, { type SquareColor } from '../../components/Square';
import Piece from '../../components/pieces';

// State Management
import Observer from '../../observers/Observer';
import Observable from 'observers/interfaces/observable';

class BoardManager implements Observable {
  public boardSquares: BoardSquareListings = {};
  private observer: Observer<BoardManager>;

  // TODO: Omit 'K' using some sort of typescript functionality for enums
  private captures: {[_side in Side]: {[_piece in PieceKind] : number}} = {
    white: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
    black: { p: 0, r: 0, h: 0, b: 0, q: 0, k: 0 },
  };

  private readonly getCurrentTurnSide: () => Side;

  constructor(startingFormation: PieceListings, currentTurnSideCallback: () => Side) {

    this.getCurrentTurnSide = currentTurnSideCallback;
    this.observer = new Observer(this);
    this.initializeBoard(startingFormation);
  };


  /*--------------------------------------------INITIALIZATION---------------------------------------------*/

  // TODO: replace orientationflipped with the side that the player is on defaulting to white
  private initializeBoard(boardConfiguration: PieceListings, side: Side = 'white') {
    // ?: If I include a board flipping function, do it here and pass the new positions to initializeSquares?
    this.initializeSquares(boardConfiguration);
  };

  private initializeSquares(pieceMapping: PieceListings) {
    for (const tileIndex in BOARD_POSITIONS) {
      const position: ShortPosition  = BOARD_POSITIONS[tileIndex];

      const regex: RegExp = /b|d|f|h/;
      const isEvenRow: Boolean = regex.test(position);

      const initialPiece: Piece | null = (typeof pieceMapping[position] === 'object') ? Piece.create(pieceMapping[position]) : null;

      const squareColor: SquareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
      const square: Square = new Square(position, squareColor, initialPiece);

      this.boardSquares[position] = square;
    };

    this.signalState();
  };


  /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/

  signalState = (params = []) => {
    const boardState = this.compileBoard(params);
    this.observer.commitState(boardState);
  };

  // TODO: Make this the single function that calls signalState and have this func be called instead to updateBoard
  updateBoard = () => {
    this.signalState();
  };

  // TODO: Fix the paramters so that it tracks the different highlighted action type
  private compileBoard = (highlightedSquarePositions: ShortPosition[] = []): BoardSquareCondensed[] => {
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


  /*--------------------------------------------HIGHLIGHTING---------------------------------------------*/
  
  // board highlighting will be acomplished here as well through state updates that will affect boardSquares
  highlightAvailableMoves = (piece?: Piece) => {
    if (piece instanceof Piece) {
      if (piece.side === this.getCurrentTurnSide()) {
        this.signalState(piece.availableMoves);
      }
    } else {
      this.signalState();
    };
  };
};

export default BoardManager;
