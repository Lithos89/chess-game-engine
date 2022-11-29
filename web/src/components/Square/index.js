import styled from 'styled-components';
import propTypes from 'prop-types';

import pieceAssets from 'data/piece-assets.json';

const StyledSquare = styled.div`
  display: block;
  background-color: ${p => p.primary ? 'white' : '#CCC'};
  flex: 0 0 12.5%;
  aspect-ratio: 1 / 1;
`;

const PieceImg = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  /* &: {
    cursor: move;
  } */
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

const Square = ({ color, position, piece }) => {

  const pieceAssetKey = getAssetKey(piece);

  const isLight = color === 'light';

  const pieceAsset = pieceAssets[pieceAssetKey];


  return (
    <StyledSquare primary={isLight}>
      {
        pieceAssetKey && <PieceImg src={pieceAsset} alt={piece.kind} draggable={true} />
      }
    </StyledSquare>
  );
};


Square.propTypes = {
  primary: propTypes.bool,
};


export default Square;
