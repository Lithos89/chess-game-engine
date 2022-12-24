import { type Position, type ShortPosition } from '../Terms';
declare const tempDiagGen: (max: number | undefined, direction?: '+' | '-') => ({ row, col }: Position) => ShortPosition[];
declare const searchFile: (max: number | undefined, direction?: '+' | '-') => ({ row, col }: Position) => ShortPosition[];
export { tempDiagGen, searchFile };
