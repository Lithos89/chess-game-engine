import { type Side, PieceKind } from '../Terms';


// ?: Not sure if structure is the appropriate file name, consider revising in the future

export interface PieceListing {
  kind: PieceKind,
  side: Side
};

export type PieceListings = {
  [index: string]: PieceListing;
};