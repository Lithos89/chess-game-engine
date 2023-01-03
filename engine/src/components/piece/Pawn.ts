// Types, interfaces, constants, ...
import { PieceKind, type Side, type BoardDirection } from '../../logic/terms';
// Class interfaces
import DynamicBehavior from './interfaces/dynamicBehavior';

// Components
import Piece from './Piece';

// Algorithms
import Search from '../../logic/algorithms/core';


class Pawn extends Piece implements DynamicBehavior {
  private readonly direction: BoardDirection = this.side === 'white' ? '+' : '-';

  // !: Temporarily set to 1, FIX BEFORE ANY NEW FEATURES
  public movementAlgorithms: null;
  moved: boolean = false;
  // TODO: Fix direction so it works on the alt board orientation

  constructor(side: Side) {
    super(PieceKind.Pawn, side);
    // ?: Could use the constructor for the direction to be implemented correctly using a value that is obtained from the game/board
  };

  public loadMoveAlgorithms = () => {
    const fileDistance = this.moved ? 1 : 2;

    return [
      Search.file(fileDistance, this.direction),
      Search.diagonals(1, this.direction)
    ];
  }
};

export default Pawn;
