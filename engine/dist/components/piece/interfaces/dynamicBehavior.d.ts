import { type MoveAlgorithm } from 'logic/algorithms/types';
export default interface DynamicBehavior {
    moved: boolean;
    loadMoveAlgorithms: () => MoveAlgorithm[];
}
