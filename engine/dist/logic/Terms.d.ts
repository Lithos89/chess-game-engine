export declare const COLUMNS: readonly ["a", "b", "c", "d", "e", "f", "g", "h"];
type ColumnsTuple = typeof COLUMNS;
export type Column = ColumnsTuple[number];
export declare const ROWS: readonly ["1", "2", "3", "4", "5", "6", "7", "8"];
type RowsTuple = typeof ROWS;
export type Row = RowsTuple[number];
export type ShortPosition = `${Column}${Row}`;
export declare const BOARD_POSITIONS: ShortPosition[];
export type Position = {
    row: Row;
    col: Column;
};
export declare const SIDES: readonly ["white", "black"];
type SideTuple = typeof SIDES;
export type Side = SideTuple[number];
export type BoardDirection = '+' | '-';
export declare enum PieceKind {
    Pawn = "p",
    Rook = "r",
    Knight = "h",
    Bishop = "b",
    Queen = "q",
    King = "k"
}
export {};
