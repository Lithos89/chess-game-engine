import { type Position, type ShortPosition } from '../Terms';
export declare const search: {
    file: (bidirectional: boolean) => ({ row, col }: Position) => ShortPosition[];
    rank: ({ row, col }: Position) => ShortPosition[];
    diagonals: ({ row, col }: Position) => ShortPosition[];
    Ls: ({ row, col }: Position) => ShortPosition[];
};
