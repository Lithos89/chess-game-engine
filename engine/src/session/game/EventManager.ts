
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
    const _boardCopy = board;

    const controlledSquares: Set<ShortPosition> = new Set();

    const otherMoves: ShortPosition[] = [];

    let king: King;

    //* Blocking or capturing
    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece)) { continue };


      if (piece.side !== side) {
        // ATTACKING

        for (const move of piece.availableMoves) {
          controlledSquares.add(move);
        };
      } else {
        // DEFENDING
        if (piece.kind === PieceKind.King) { king = piece as King; continue}

        const playableMoves: ShortPosition[] = [];

        for (const move of piece.availableMoves) {
          // Block the attack line or capture the piece
          if (frontAttackLine.includes(move) || move === convertPosition(attackPiece.position)) {
            playableMoves.push(move);
          };
        };
        piece.availableMoves = playableMoves;
        otherMoves.push(...playableMoves)
      } 
    }

    const kingMoves: Set<ShortPosition> = new Set(king.availableMoves)
    controlledSquares.forEach((pos) => kingMoves.delete(pos))


    fullAttackLine.forEach((pos) => kingMoves.delete(pos))
    // kingMoves.delete(controlledSquares.values())

    king.availableMoves = Array.from(kingMoves);

    return isEmpty(king.availableMoves) && isEmpty(otherMoves);
    
  };

  static victoryCheck(board: BoardSquareListings) {

  }
};

export default EventManager;
