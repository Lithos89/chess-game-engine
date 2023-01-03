import { type Side, PieceKind, ShortPosition } from '../../logic/terms';
export interface PieceListing {
    kind: PieceKind;
    side: Side;
}
export type PieceListings = {
    [_pos in ShortPosition]?: PieceListing;
};
