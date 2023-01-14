
import { isEmpty } from 'lodash';

// Types, interfaces, constants, ...
import { PieceListing } from '../../formation/structure/pieceCollection';
import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/algorithms/types';
  // Class intefaces
import DynamicBehavior from './interfaces/dynamicBehavior';

// Components
import Square from '../Square';
// import { Pawn, Rook, Knight, Bishop, Queen, King } from './index';
// import Pawn from './Pawn';
// import Rook from './Rook';
// import Knight from './Knight';
// import Bishop from './Bishop';
// import Queen from './Queen';
import King from './King';

export default abstract class Piece {
  public readonly side: Side;
  public readonly kind: PieceKind;
  public position: Position;
  public isProtected: boolean = false;

  public legalLines: MoveLine[]; // Legal lines of movement
  public captureLines: MoveLine[];
  public availableMoves: ShortPosition[];

  // If captureAlgorithms left empty, then same logic as movement algorithms
  public captureAlgorithms: MoveAlgorithm[] = [];
  abstract movementAlgorithms: MoveAlgorithm[];
  
  // !: Circular dependence created, need to move this outside the class to solve the problem or come up with something else
  // public static create({ kind, side }: PieceListing): Piece {
  //   switch (kind) {
  //     case PieceKind.Pawn:
  //       return new Pawn(side);
  //     case PieceKind.Rook:
  //       return new Rook(side);
  //     case PieceKind.Knight:
  //       return new Knight(side);
  //     case PieceKind.Bishop:
  //       return new Bishop(side);
  //     case PieceKind.Queen:
  //       return new Queen(side);
  //     case PieceKind.King:
  //       return new King(side);
  //     default:
  //       throw new Error(`Unable to create piece with kind: ${kind}, side: ${side}`);
  //   };
  // };

  constructor(piece: PieceKind, side: Side) { 
    this.kind = piece;
    this.side = side;
  };
  
  public isMultiBehavioral(): this is DynamicBehavior {
    // TODO: See if hasOwnProperty can be used for interface method and attatched here
    return Object.prototype.hasOwnProperty.call(this, "moved");
  };

  public updateLines() {
    if (this.isMultiBehavioral()) {
      const _movementAlgorithms = this.loadMoveAlgorithms();
      this.legalLines = _movementAlgorithms.flatMap(algo => algo(this.position));
    } else if (this.movementAlgorithms !== null) {
      this.legalLines = this.movementAlgorithms.flatMap(algo => algo(this.position));
    } else {
      throw Error;
    };

    if (!isEmpty(this.captureAlgorithms))
      this.captureLines = this.captureAlgorithms.flatMap(algo => algo(this.position));
  };

  // public influenceEmptySquare = (controlledSquares, enemyKing?, enemySide?) => (linePos: ShortPosition) => {
  //   controlledSquares.add(linePos);
  //   return true;
  // };

  public influenceEmptySquare = (square: Square): boolean => {
    square.controlled[this.side] = true;
    return true;
  };

  // public influenceOccupiedSquare = (board, protectedPieces, checks) => (linePos: ShortPosition, playableLine: MoveLine) => {
  //   const destPiece: Piece = board[linePos].piece;
  //   const altCapturing = !isEmpty(this.captureAlgorithms); // If a piece can still move there without capturing
  //   const simpleCaptureAvailable: boolean = destPiece?.side !== this.side && !altCapturing;

  //   if (simpleCaptureAvailable) {
  //     if (destPiece?.kind === PieceKind.King) {
  //       checks.push({ attackPiece: this, frontAttackLine: playableLine });
  //     } else {
  //       return true;
  //     };
  //   } else {
  //     destPiece.isProtected = true;
  //     protectedPieces.push(destPiece);
  //   };
  //   return false; 
  // };

  public influenceOccupiedSquare = (square: Square, playableLine: MoveLine): boolean => {
    const destPiece: Piece = square.piece; //!: destPiece still optional with current implementation, FIX
    const altCapturing = !isEmpty(this.captureAlgorithms); // If a piece can still move there without capturing
    const simpleCaptureAvailable: boolean = destPiece?.side !== this.side && !altCapturing;

    if (simpleCaptureAvailable) {
      if (destPiece?.kind === PieceKind.King) {
        (destPiece as King).checks.push({ attackPiece: this, frontAttackLine: playableLine });
      } else {
        return true;
      };
    } else {
      destPiece.isProtected = true;
    };
    return false; 
  };

  //TODO: Move this into the Dynamic Behaviour interface if you can
  public altInfluenceEmptySquare(square: Square) { return false };

  public altInfluenceOccupiedSquare(square: Square, playableLine: MoveLine) { return false };

  // ?: See whether capture should have a default value, be optional, or be required.
  // !: Logmove is a horrible name for how the method works, make sure to change
  logMove(to: ShortPosition, didCapture: boolean = false) {
    const pieceAbbr = this.kind !== PieceKind.Pawn ? this.kind.toUpperCase() : '';
    const captureMark = didCapture ? 'x' : '';

    return pieceAbbr + captureMark + to;
  };
};