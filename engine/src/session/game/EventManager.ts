
import { isNull, isEmpty } from "lodash";

// Types, interfaces, constants, ...
import { type Side, type ShortPosition, PieceKind } from "../../logic/terms";
import { type MoveLine } from "../../logic/algorithms/types";
import { type BoardSquareListings } from "../../formation/structure/squareCollection";

// Classes
// import Piece, { King, Pawn } from "../../components/piece";
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';
import Pawn from '../../components/piece/Pawn';

// Utils
import convertPosition from '../../utils/position/convertPosition';

interface Attack {
  attackPiece: Piece,
  frontAttackLine: MoveLine
};

class EventManager {

  static forceCheckResolve = (board: BoardSquareListings, { attackPiece, frontAttackLine }: Attack, side: Side) => {

    const preventitiveMoves: ShortPosition[] = []

    let king: King;

    console.info(attackPiece);

    //* Blocking or capturing
    for (const boardPos in board) {
      const square = board[boardPos];
      const piece: Piece | null = square.piece;

      if (isNull(piece) || piece.side === side) { continue };

      //* DEFENDING
      if (piece instanceof King) {
        king = piece;
        continue;
      };

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

    const kingMoves: Set<ShortPosition> = new Set(king.availableMoves)

    console.info(kingMoves);
    
    // Remove the positions that are still in the attacking piece's lines of attack
    if (!(attackPiece instanceof Pawn)) {
      attackPiece.legalLines.flat(2).forEach((pos) => {
        console.info(pos)
        kingMoves.delete(pos as ShortPosition)
      })
    }
    
    king.availableMoves = Array.from(kingMoves);


    return isEmpty(king.availableMoves) && isEmpty(preventitiveMoves);
    
  };

  static victoryCheck(board: BoardSquareListings) {

  }
};

export default EventManager;
