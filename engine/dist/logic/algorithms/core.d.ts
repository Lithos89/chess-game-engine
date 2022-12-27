import { type Position, type ShortPosition } from '../Terms';
declare const Search: {
    diagonals: (max: number | undefined, direction?: '+' | '-') => ({ row, col }: Position) => ShortPosition[][];
    file: (max: number | undefined, direction?: '+' | '-') => ({ row, col }: Position) => ShortPosition[][];
    rank: (max: number | undefined, direction?: '+' | '-') => ({ row, col }: Position) => ShortPosition[][];
    Ls: ({ row, col }: Position) => ShortPosition[][];
};
export default Search;
