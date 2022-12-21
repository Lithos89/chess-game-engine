
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { BOARD_POSITIONS, type ShortPosition, type Side } from '../../logic/Terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type PieceListings } from '../../formation/structure/pieceCollection';
import { PresentedSquare, type BoardSquareListings } from '../../formation/structure/squareCollection';

// Components
import Square, { type SquareColor } from '../../components/Square';
import Piece from '../../components/piece';

// Utils
import { flipFormation, convertPosition } from '../../utils';


class BoardManager {
  public boardSquares: BoardSquareListings = {};
  private squareHighlighting: {[key in ShortPosition]? : PresentedSquare["focus"]} = {};

  private readonly getCurrentTurnSide: () => Side;

  constructor(startingFormation: PieceListings, alt: boolean, currentTurnSideCallback: () => Side, private updateState: () => void) {
    this.getCurrentTurnSide = currentTurnSideCallback;

    this.initBoard(startingFormation, alt);
  };


  /*--------------------------------------------INITIALIZATION---------------------------------------------*/

  private initBoard(pieceConfiguration: PieceListings, flipped: boolean = false) {
    pieceConfiguration = flipped ? pieceConfiguration : flipFormation(pieceConfiguration);

    const startingPieces = this.initPieces(pieceConfiguration);
    this.initSquares(startingPieces);
    // this.updateState();
  };

  private initPieces(pieceConfiguration: PieceListings): {[_pos in ShortPosition]? : Piece} {
    const initialPieces: {[_pos in ShortPosition]? : Piece} = {};

    for (const pos in pieceConfiguration) {
      initialPieces[pos] = Piece.create(pieceConfiguration[pos]);
    };

    return initialPieces;
  };

  private initSquares(pieceMapping: {[_pos in ShortPosition]? : Piece}) {
    for (const tileIndex in BOARD_POSITIONS) {
      const position: ShortPosition  = BOARD_POSITIONS[tileIndex];
      const regex: RegExp = /b|d|f|h/;
      const isEvenRow: Boolean = regex.test(position);

      const initialPiece: Piece | null = pieceMapping[position] || null;

      const squareColor: SquareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'light' : 'dark';
      const square: Square = new Square(position, squareColor, initialPiece);
      this.boardSquares[position] = square;
    };
  };


  /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/

  // TODO: Fix the paramters so that it tracks the different highlighted action type
  public compileBoard = (): BoardSquareCondensed[] => {
    const processedBoard: BoardSquareCondensed[] = [];

    for (const position in this.boardSquares) {
      processedBoard.push({
        position: position as ShortPosition,
        square: {
          color: this.boardSquares[position].color,
          focus:  (position in this.squareHighlighting) ? 
            this.squareHighlighting[position as ShortPosition] : 
            { highlighted: false, action: null },
        },
        piece: this.boardSquares[position].piece ? 
          {
            kind: this.boardSquares[position].piece.kind,
            side: this.boardSquares[position].piece.side,
          } : null
      });
    };

    return processedBoard;
  };


  /*--------------------------------------------HIGHLIGHTING---------------------------------------------*/
  
  public highlightMoves = (piece?: Piece) => {
    if (piece instanceof Piece) {
      if (piece.side === this.getCurrentTurnSide()) {
        //* Highlighting the available moves of the piece
        for (const pos of piece.availableMoves) {
          this.squareHighlighting[pos] = {
            highlighted: true,
            action: isNull(this.boardSquares[pos]?.piece) ? "move" : "capture",
          };
        };
        
        //* Highlighting the piece (using 'null' for now but may change)
        this.squareHighlighting[convertPosition(piece.position) as ShortPosition] = {
          highlighted: true,
          action: null,
        };

        this.updateState();
      };
    } else {
      this.squareHighlighting = {};
      this.updateState();
    };
  };
};

export default BoardManager;
