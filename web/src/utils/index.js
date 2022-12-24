import pieceAssets from 'data/piece-assets.json';

const getAssetKey = (pieceObj) => {
  if (!pieceObj) return null;

  if (pieceObj.side === 'black') {
    switch (pieceObj.kind) {
      case 'p':
        return 'pawn_black';
      case 'r':
        return 'rook_black';
      case 'h':
        return 'knight_black';
      case 'b':
        return 'bishop_black';
      case 'q':
        return 'queen_black';
      case 'k':
        return 'king_black';
      default:
        return null;
    };
  } else if (pieceObj.side === 'white') {
    switch (pieceObj.kind) {
      case 'p':
        return 'pawn_white';
      case 'r':
        return 'rook_white';
      case 'h':
        return 'knight_white';
      case 'b':
        return 'bishop_white';
      case 'q':
        return 'queen_white';
      case 'k':
        return 'king_white';
      default:
        return null;
    };
  } else {
    return null;
  };
};

function getAssetType(side, kind) {
  if (side === 'black') {
    switch (kind) {
      case 'p':
        return 'pawn_black';
      case 'r':
        return 'rook_black';
      case 'h':
        return 'knight_black';
      case 'b':
        return 'bishop_black';
      case 'q':
        return 'queen_black';
      case 'k':
        return 'king_black';
      default:
        return null;
    };
  } else if (side === 'white') {
    switch (kind) {
      case 'p':
        return 'pawn_white';
      case 'r':
        return 'rook_white';
      case 'h':
        return 'knight_white';
      case 'b':
        return 'bishop_white';
      case 'q':
        return 'queen_white';
      case 'k':
        return 'king_white';
      default:
        return null;
    };
  } else {
    return null;
  };
};

export function getAssetLink(side, kind) {
  const assetType = getAssetType(side, kind);
  return pieceAssets[assetType];
};