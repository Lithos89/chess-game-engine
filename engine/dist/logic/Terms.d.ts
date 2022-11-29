export type Side = 'white' | 'black';
export declare const boardPositions: ShortPosition[];
export type Column = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type Row = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type ShortPosition = `${Column}${Row}`;
export declare enum PieceKind {
    Pawn = "p",
    Rook = "r",
    Knight = "h",
    Bishop = "b",
    Queen = "q",
    King = "k"
}
export interface PieceListing {
    kind: PieceKind;
    side: Side;
}
export type PieceListings = {
    [index: string]: PieceListing;
};
export declare const startingFormation: PieceListings;
export type Position = {
    row: Row;
    col: Column;
};
