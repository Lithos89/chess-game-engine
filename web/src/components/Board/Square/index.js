import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'

const pieceMap = {
  bishop_white: '/pieces/bishopW.png',
  bishop_black: '/pieces/bishopB.png',
  king_white: '/pieces/kingW.png',
  king_black: '/pieces/kingB.png',
  knight_white: '/pieces/knightW.png',
  knight_black: '/pieces/knightB.png',
  pawn_white: '/pieces/pawnW.png',
  pawn_black: '/pieces/pawnB.png',
  rook_white: '/pieces/rookW.png',
  rook_black: '/pieces/rookB.png',
  queen_white: '/pieces/queenW.png',
  queen_black: '/pieces/queenB.png'
};

const StyledSquare = styled.div`
  display: block;

  /* position: static; */
  background-color: ${props => props.primary ? 'white' : '#CCCC'};
  flex: 0 0 12.5%;
  /* padding: 10px; */
  aspect-ratio: 1 / 1;
`;

const PieceImg = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const Square = ({ primary, position }) => {

  const keys = Object.keys(pieceMap)

  const pieceKey = keys[Math.floor((Math.random() * keys.length))];
  const randomPiece = pieceMap[pieceKey];

  console.log(randomPiece)

  return (
    <StyledSquare primary={primary}>
      <PieceImg src={randomPiece} alt={pieceKey} />
    </StyledSquare>
  )
};


Square.propTypes = {
  primary: propTypes.bool
};


export default Square;
