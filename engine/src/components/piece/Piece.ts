
// Types, interfaces, constants, ...
import { PieceListing } from 'formation/structure/pieceCollection';
import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
// Class intefaces
import DynamicBehavior from './interfaces/dynamicBehavior';

// Components
import { Pawn, Rook, Knight, Bishop, Queen, King } from './index';


// Legal line of movement (positions) ordered from start to finish
type MoveLine = ShortPosition[]; // !: See if this is used anywhere else and maybe export by moving to interfaces
type MoveAlgorithm = (_position: Position) => MoveLine[];

abstract class Piece {
  public readonly side: Side;
  public readonly kind: PieceKind;
  public position: Position;

  public legalLines: MoveLine[]; // Legal lines of movement
  public availableMoves: ShortPosition[];

  abstract movementAlgorithms: MoveAlgorithm[];

  public static create({ kind, side }: PieceListing): Piece {
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
      default:
        throw new Error(`Unable to create piece with kind: ${kind}, side: ${side}`);
    };
  };

  constructor(piece: PieceKind, side: Side) { 
    this.kind = piece;
    this.side = side;
  };
  
  public isMultiBehavioral(): this is DynamicBehavior {
    // TODO: See if hasOwnProperty can be used for interface method and attatched here
    return Object.prototype.hasOwnProperty.call(this, "moved");
  };

  public updateLegalLines() {
    if (this.isMultiBehavioral()) {
      const _movementAlgorithms = this.loadMoveAlgorithms();
      this.legalLines = _movementAlgorithms.flatMap(algo => algo(this.position));
    } else if (this.movementAlgorithms !== null) {
      this.legalLines = this.movementAlgorithms.flatMap(algo => algo(this.position));
    } else {
      throw Error;
    };
  };

  // ?: See whether capture should have a default value, be optional, or be required.
  // !: Logmove is a horrible name for how the method works, make sure to change
  logMove(to: ShortPosition, didCapture: boolean = false) {
    const pieceAbbr = this.kind !== PieceKind.Pawn ? this.kind.toUpperCase() : '';
    const captureMark = didCapture ? 'x' : '';

    return pieceAbbr + captureMark + to;
  };
};

export default Piece;
