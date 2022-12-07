import { type Side, PieceKind } from '../../logic/Terms';
export interface PieceListing {
    kind: PieceKind;
    side: Side;
}
export type PieceListings = {
    [index: string]: PieceListing;
};
