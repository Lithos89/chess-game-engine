
import { isNull } from 'lodash';

// Types, interfaces, constants, ...
import { type ShortPosition, type Side, type Row, type Column, type SquareColor, type BoardDirection, SIDES, BOARD_POSITIONS } from '../../logic/terms';
import { BoardSquareCondensed } from '../../formation/structure/board';
import { type PieceListings} from '../../formation/structure/pieceCollection';
import { type BoardSquareListings, PresentedSquare } from '../../formation/structure/squareCollection';
import { type MoveLine, Attack } from '../../logic/concepts';

// Components
import Square from '../../components/Square';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';
import Rook from '../../components/piece/Rook';

// Utils
import flipFormation from '../../utils/board/flipFormation';
import sortPieces from '../../utils/board/sortPieces';
import createPiece from '../../utils/piece/createPiece';
import convertPosition from '../../utils/regulation/position/convertPosition';
import getEnemySide from '../../utils/regulation/side/getEnemySide';


class BoardManager {
  public boardSquares: BoardSquareListings = {};
  private squareHighlighting: {[key in ShortPosition]? : PresentedSquare["focus"]} = {};

  public kings: {[side in Side]: King};

  private readonly getCurrentTurnSide: () => Side;

  castleAvailabilityCallback = (side: Side) => (direction: BoardDirection): boolean => {
    const backRank: Row = side === "white" ? "1" : "8";
    const isKingSide = direction === '+';


    //* Legality check for the associated Rook
    const rookCol = isKingSide ? "h" : "a";
    const rookSquare = this.boardSquares[`${rookCol}${backRank}` as ShortPosition]; 
    const rookCheck = rookSquare.piece instanceof Rook && rookSquare.piece.moved === false;


    //* Legality checks for the squares in between the King and the Rook
    //? This could be stored as constants and be moved into a type related file
    const kingSideCols: Column[] = ["f", "g"];
    const queenSideCols: Column[] = ["b", "c", "d"];

    const columnsToCheck = isKingSide ? kingSideCols : queenSideCols;

    const isPathClear = columnsToCheck.every((col) => {
      const square = this.boardSquares[`${col}${backRank}`];
      const isUnnocupied = square.piece === null;

      if (square.position.col === "b") {
        return isUnnocupied;
      } else {
        const isControlledByEnemy = square.controlled[getEnemySide(side)] === true;

        return isUnnocupied && !isControlledByEnemy;
      };
    });
    
  
    return isPathClear && rookCheck;
  };

  constructor(
    startingFormation: PieceListings,
    flipped: boolean,
    currentTurnSideCallback: () => Side,
    private updateState: () => void
  ) {
    this.getCurrentTurnSide = currentTurnSideCallback;
    this.initBoard(startingFormation, flipped);
  };


  /*--------------------------------------------INITIALIZATION---------------------------------------------*/

  private initBoard(pieceConfiguration: PieceListings, flipped: boolean = false) {
    pieceConfiguration = flipped ? pieceConfiguration : flipFormation(pieceConfiguration);

    const startingPieces = this.initPieces(pieceConfiguration);
    this.initSquares(startingPieces);
  };

  private initPieces(pieceConfigurations: PieceListings): {[_pos in ShortPosition]? : Piece} {
    const initialPieces: {[_pos in ShortPosition]? : Piece} = {};

    for (const pos in pieceConfigurations) {
      const { kind, side } = pieceConfigurations[pos];
      initialPieces[pos] = createPiece(kind, side);
    };

    return initialPieces;
  };

  private initSquares(pieceMapping: {[_pos in ShortPosition]? : Piece}) {
    for (const tileIndex in BOARD_POSITIONS) {
      const position: ShortPosition = BOARD_POSITIONS[tileIndex];

      const regex: RegExp = /b|d|f|h/;
      const isEvenRow: Boolean = regex.test(position);
      const squareColor: SquareColor = ((Number(tileIndex) % 8) + Number(isEvenRow)) % 2 === 0 ? 'dark' : 'light';

      const startingPiece: Piece | null = pieceMapping[position] || null;

      if (startingPiece instanceof King) {
        startingPiece.castleAvailableCallback = this.castleAvailabilityCallback(startingPiece.side);
      };

      this.boardSquares[position] = new Square(position, squareColor, startingPiece);
    };
  };


  /*--------------------------------------------STATE MANAGEMENT---------------------------------------------*/

  // TODO: Fix the paramters so that it tracks the different highlighted action type
  public compileBoard = (): BoardSquareCondensed[] => {
    const processedBoard: BoardSquareCondensed[] = [];

    for (const pos in this.boardSquares) {
      processedBoard.push({
        position: pos as ShortPosition,
        square: {
          color: this.boardSquares[pos].color,
          focus: (pos in this.squareHighlighting) ? 
            this.squareHighlighting[pos as ShortPosition] : 
            { highlighted: false, action: null },
        },
        piece: this.boardSquares[pos].piece ? 
          {
            kind: this.boardSquares[pos].piece.kind,
            side: this.boardSquares[pos].piece.side,
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


  /*-----------------------------------CHESS RULES APPLICATION---------------------------------------*/

  // *: Loops over each square on the board to update each piece with their respective available moves
  public processAvailableMoves(checks: Attack[], sideLastMoved?: Side) {
    //* Basic piece defined as any piece other than a king
    const [basicPieces, kings] = sortPieces(this.boardSquares);

    // Reset each piece's protected (king cannot capture) status and attacks that the king recieved
    basicPieces.white.forEach(piece => piece.isProtected = false);
    basicPieces.black.forEach(piece => piece.isProtected = false);
    kings.black.checks = [];
    kings.white.checks = [];

    // Updates checks, protection, square control, and available moves excluding check, 
    this.updateBasicPieces(basicPieces.white);
    this.updateBasicPieces(basicPieces.black);

    // Update kings' available moves
    this.updateKings(kings as { [side in Side] : King});

    // Restrict the movement of pieces if it is in an absolute pin (moving out the way would result in an illegal check)
    this.applyPins(basicPieces, kings);

    // Update the game's checks based off the last move the opponent made
    if (sideLastMoved) {
      const enemyChecks = kings[getEnemySide(sideLastMoved)].checks;
      checks.push(...enemyChecks);
    };

    this.updateState();
  };

  // *: Process piece's influence on the board based on its legal lines or capture lines
  private updatePieceMoves(piece: Piece): ShortPosition[] {
    const playableLines: MoveLine[] = [];

    // TODO: Figure out a way to destructure these properties using clean code
    const standardMovement = [
      piece.legalLines,
      piece.influenceEmptySquare, 
      piece.influenceOccupiedSquare
    ];

    const movementTypes: any[] = [
      standardMovement,
      ...(piece.hasAlternativeCapturing() ? [[
        piece.captureLines,
        piece.altInfluenceEmptySquare, 
        piece.altInfluenceOccupiedSquare
      ]] : [])
    ];

    for (const movementObj of movementTypes) {
      const [moveLines, influenceEmptySquare, influenceOccupiedSquare] = movementObj;
      
      for (const moveLine of moveLines) { 
        const playableLine: MoveLine = [];

        // * Further line search is stopped when a piece is detected, resulting in [empty..., capture?]
        for (const linePos of moveLine) {
          const square = this.boardSquares[linePos];
          const isSquareUnoccupied = isNull(square.piece);

          if (isSquareUnoccupied) {
            const moveAvailable = influenceEmptySquare(square);

            if (moveAvailable)
              playableLine.push(linePos);

          } else {
            const captureAvailable = influenceOccupiedSquare(square, playableLine);

            if (captureAvailable)
              playableLine.push(linePos);

            break;
          };
        };
        playableLines.push(playableLine);
      };
    };

    // Disseminate lines into a simple list of available moves
    return playableLines.flat();
  };

  private updateBasicPieces(pieces: Piece[]) {
    for (const piece of pieces){
      piece.availableMoves = []; // Reset piece moveset
      
      const updatedMoveSet = this.updatePieceMoves(piece);
      piece.availableMoves.push(...updatedMoveSet);
    };
  };

  private updateKings(kings: { [side in Side] : King}) {
    for (const side of SIDES) {
      const king = kings[side];

      const enemySide = getEnemySide(side);
      // TODO: See if I can find a better solution, this implementation is prone to bugs
      const enemyKing = kings[enemySide];

      king.enemyKing = enemyKing;

      king.availableMoves = []; // Reset moveset

      const updatedMoveSet = this.updatePieceMoves(king);
      king.availableMoves.push(...updatedMoveSet);
    };
  };

  private applyPins(basicPieces: {[side in Side]: Piece[]}, kings: {[side in Side]: King}) {
    for (const side of SIDES) {
      const enemySide = getEnemySide(side);
      const enemyKing = kings[enemySide];
      const enemyKingPos = convertPosition(enemyKing.position) as ShortPosition;

      for (const piece of basicPieces[side]) {
        //? Excludes capture lines but given the current state of the game (and in general) works and does not break
        for (const fullLine of piece.legalLines) {
          const _kingIndex = fullLine.indexOf(enemyKingPos);

          if (_kingIndex === -1) { continue }; // Skip the line if the enemy king is not in the legal line of attack

          //* Check for pin if the enemy king is in the piece's legal line of attack
          const attackLine = fullLine.filter((_, i) => i < _kingIndex); // Trim the line up to the king
          let pinnedPiece: Piece | null = null; // Temporary variable to store a pinnned piece

          for (const _pos of attackLine) {
            const destPiece: Piece | null = this.boardSquares[_pos].piece;

            if (!isNull(destPiece)) {
              if (destPiece.side === side) {
                pinnedPiece = null;
                break;
              } else {
                if (pinnedPiece instanceof Piece) {
                  //* More than one enemy piece is between the attack, therefore no pin
                  pinnedPiece = null;
                  break;
                } else {
                  pinnedPiece = destPiece;
                };
              }
            }
          };

          if (pinnedPiece) {
            const regularMoves = pinnedPiece.availableMoves;

            const pinnedMoves = regularMoves.filter((move) => {
              const blocksAttack = attackLine.includes(move);
              const capturesAttacker = move === convertPosition(piece.position);
              return blocksAttack || capturesAttacker;
            });
            pinnedPiece.availableMoves = pinnedMoves;
          }
        }
      }
    }
  }


  public commitCastle(king: King, direction: BoardDirection) {
    const moveRook = (from: ShortPosition, to: ShortPosition) => {
      const originSquare = this.boardSquares[from];
      const destSquare = this.boardSquares[to];

      const originPiece = originSquare.piece;
      originSquare.piece = null;

      destSquare.setPiece(originPiece);

    };

    if (king.side === 'white') {
      if (direction === '+') {
        moveRook('h1', 'f1');
      } else {
        moveRook('a1', 'd1');
      };
    } else {
      if (direction === '+') {
        moveRook('h8', 'f8');
      } else {
        moveRook('a8', 'd8');
      };
    };
  };
};

export default BoardManager;
