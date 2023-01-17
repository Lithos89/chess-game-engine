import { type MoveAlgorithm } from '../../../logic/concepts';
import Square from '../../../components/Square';
export default interface DynamicBehavior {
    moved: boolean;
    loadMoveAlgorithms: () => MoveAlgorithm[];
    altInfluenceEmptySquare?: (square: Square) => boolean;
}
