// Types, interfaces, constants, ...
import { boardPositions, PieceKind, ShortPosition, Side } from '../../logic/Terms';
import { type PieceListings, PieceListing } from '../../formation/structure';

// Components
import Square, { SquareColor } from '../../components/Square';
import Piece, { Pawn, Rook, Knight, Bishop, Queen, King } from '../../components/pieces';

// Controllers
import MoveManager from '../move/MoveManager';

export default class BoardController {
  boardSquares: { [shortPosition: string] : Square } = {};
  moveManager: MoveManager;

  constructor(startingFormation: PieceListings) {
    this.initializeBoard(startingFormation);
    this.moveManager = new MoveManager(this.boardSquares);
    // console.log(this.moveController)
  };
  
  // board highlighting will be acomplished here as well through state updates that will affect boardSquares
  highlightAvailableSquares = () => {

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