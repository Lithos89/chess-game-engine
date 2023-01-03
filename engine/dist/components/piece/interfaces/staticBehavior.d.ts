import { type ShortPosition, type Position } from 'logic/terms';
export default interface StaticBehavior {
    moved: boolean;
    loadMoveAlgorithms: () => ((_position: Position) => ShortPosition[][])[];
}
