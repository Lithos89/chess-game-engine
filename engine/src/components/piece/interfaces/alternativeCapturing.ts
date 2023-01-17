
// Types, interfaces, constants, ...
import { type MoveAlgorithm, type MoveLine } from '../../../logic/concepts';

// Components
import Square from '../../Square';

export default interface AlternativeCapturing {
  captureLines: MoveLine[];
  captureAlgorithms: MoveAlgorithm[];

  altInfluenceEmptySquare: (square: Square) => boolean;
  altInfluenceOccupiedSquare: (square: Square, playableLine: MoveLine) => boolean;
};
