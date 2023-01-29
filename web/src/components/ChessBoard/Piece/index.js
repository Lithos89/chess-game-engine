import styled from 'styled-components';

import pieceAssets from 'data/piece-assets.json';

const PieceImg = styled.img`
  cursor: pointer;
  width: 90%;
  height: 90%;
  margin: auto;
`;

// TODO: Figure out how to handle nulls in this function in a more clean fashion
// could use ternary using side to present the appropriate version depending on the piece
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

const Piece = ({ piece }) => {

  const pieceAssetKey = getAssetKey(piece);

  const pieceAsset = pieceAssets[pieceAssetKey];

  return (
    <PieceImg src={pieceAsset} alt={piece.kind} draggable={true} />
  );
};

export default Piece;
