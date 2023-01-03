import { type Side, PieceKind, ShortPosition } from '../../logic/terms';

// ?: Not sure if structure is the appropriate file name, consider revising in the future

export interface PieceListing {
  kind: PieceKind,
  side: Side
};

export type PieceListings = {
  [_pos in ShortPosition]?: PieceListing;
};
