
import { isNull, isEmpty } from "lodash";

// Types, interfaces, constants, ...
import { type Side, type ShortPosition, PieceKind } from "../../logic/terms";
import { type MoveLine } from "../../logic/algorithms/types";
import { type BoardSquareListings } from "../../formation/structure/squareCollection";

// Classes
import Piece, { King } from "components/piece";


import { convertPosition } from "../../utils";

interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine,
  fullAttackLine: MoveLine
};

class EventManager {

  static forceCheckResolve(board: BoardSquareListings, { attackPiece, frontAttackLine, fullAttackLine }: Attack, side: Side): boolean {

    const controlledSquares: Set<ShortPosition> = new Set();

    const preventitiveMoves: ShortPosition[] = []

    let king: King;

    console.info(attackPiece);

    //* Blocking or capturing
    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece)) { continue };

      if (piece.side === side) {
        //* ATTACKING

        for (const move of piece.availableMoves) {
          controlledSquares.add(move);
        };

      } else {
        //* DEFENDING
        if (piece.kind === PieceKind.King) { king = piece as King; continue}

        const playableMoves: ShortPosition[] = [];

        for (const move of piece.availableMoves) {
          // Block the attack line or capture the piece
          if (frontAttackLine.includes(move) || move === convertPosition(attackPiece.position)) {
            preventitiveMoves.push(move);
            playableMoves.push(move);
          };
        };
        piece.availableMoves = playableMoves;
      } 
    }

    const kingMoves: Set<ShortPosition> = new Set(king.availableMoves)

    try {
      controlledSquares.forEach((pos) => kingMoves.delete(pos))
      attackPiece.legalLines.flat(2).forEach((pos) => kingMoves.delete(pos))
    } finally {
      king.availableMoves = Array.from(kingMoves);
    }

    // kingMoves.delete(controlledSquares.values())


    return isEmpty(king.availableMoves) && isEmpty(preventitiveMoves);
    
  };

  static victoryCheck(board: BoardSquareListings) {

  }
};

export default EventManager;
