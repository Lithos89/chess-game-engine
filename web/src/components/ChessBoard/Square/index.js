import styled from 'styled-components';
import propTypes from 'prop-types';

import Piece from '../Piece';

const StyledSquare = styled.div`
  display: flex;
  background-color: ${p => p.primary ? 'white' : '#CCC'};
  flex: 0 0 12.5%;
  aspect-ratio: 1 / 1;
`;


const Square = ({ square, square2, color, position, piece, update }) => {

  const isLight = color === 'light';



  return (
    <StyledSquare primary={isLight}>
      {
        piece &&  <Piece piece={piece} square={square} square2={square2} update={update} />
      }
    </StyledSquare>
  );
};


Square.propTypes = {
  primary: propTypes.bool,
};


export default Square;
