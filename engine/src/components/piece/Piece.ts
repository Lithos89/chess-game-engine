
// Types, interfaces, constants, ...
import { PieceKind, type Side, type ShortPosition, type Position } from '../../logic/terms';
import { type MoveLine, type MoveAlgorithm } from '../../logic/concepts';
//* Class intefaces
import DynamicBehavior from './interfaces/dynamicBehavior';
import AlternativeCapturing from './interfaces/alternativeCapturing';

// Components
import Square from '../Square';
import King from './King';

export default abstract class Piece {
  public position: Position;
  public isProtected: boolean = false;
  abstract readonly kind: PieceKind;

  public legalLines: MoveLine[]; // Legal lines of movement
  public availableMoves: ShortPosition[];

  abstract movementAlgorithms: MoveAlgorithm[] | null;

  constructor(
    public readonly side: Side
  ) {};
  
  public isMultiBehavioral(): this is DynamicBehavior {
    // TODO: See if hasOwnProperty can be used for interface method and attatched here
    return Object.prototype.hasOwnProperty.call(this, "moved");
  };

  public hasAlternativeCapturing(): this is AlternativeCapturing {
    return Object.prototype.hasOwnProperty.call(this, "captureAlgorithms");
  };

  /*------------------------------------MOVEMENT------------------------------*/

  public updateLines() {
    if (this.isMultiBehavioral()) {
      const _movementAlgorithms = this.loadMoveAlgorithms();
      this.legalLines = _movementAlgorithms.flatMap(algo => algo(this.position));
    } else if (this.movementAlgorithms !== null) {
      this.legalLines = this.movementAlgorithms.flatMap(algo => algo(this.position));
    } else {
      throw Error;
    };

    if (this.hasAlternativeCapturing())
      this.captureLines = this.captureAlgorithms.flatMap(algo => algo(this.position));
  };

  public influenceEmptySquare = (square: Square): boolean => {
    square.controlled[this.side] = true;
    return true;
  };

  public influenceOccupiedSquare = (square: Square, playableLine: MoveLine): boolean => {
    const destPiece: Piece = square.piece; //!: destPiece still optional with current implementation, FIX
    const altCapturing = this.hasAlternativeCapturing(); // If a piece can still move there without capturing
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

  
  /*------------------------------------MOVE LOGGING-----------------------------*/

  // ?: See whether capture should have a default value, be optional, or be required.
  // !: Logmove is a horrible name for how the method works, make sure to change
  logMove(to: ShortPosition, didCapture: boolean = false) {
    const pieceAbbr = this.kind !== PieceKind.Pawn ? this.kind.toUpperCase() : '';
    const captureMark = didCapture ? 'x' : '';

    return pieceAbbr + captureMark + to;
  };
};