import { type Position, type BoardDirection } from '../terms';
import { type MoveLine } from './types';
declare const Search: {
    diagonals: (max?: number | undefined, direction?: BoardDirection) => ({ row, col }: Position) => MoveLine[];
    file: (max?: number | undefined, direction?: BoardDirection) => ({ row, col }: Position) => MoveLine[];
    rank: (max?: number | undefined, direction?: BoardDirection) => ({ row, col }: Position) => MoveLine[];
    Ls: () => ({ row, col }: Position) => MoveLine[];
};
export default Search;
