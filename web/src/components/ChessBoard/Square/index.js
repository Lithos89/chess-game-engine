import styled from 'styled-components';
import propTypes from 'prop-types';

import Piece from '../Piece';

const StyledSquare = styled.div`
  display: flex;
  background-color: ${p => p.isHighlighted ? 'red' : p.primary ? 'white' : '#CCC'};
  flex: 0 0 12.5%;
  aspect-ratio: 1 / 1;
`;


const Square = ({ color, position, piece, update, isHighlighted }) => {

  const isLight = color === 'light';

  const move = () => {
    // highlight(position);
    update(position, piece);
  }

  return (
    <StyledSquare primary={isLight} isHighlighted={isHighlighted} onClick={move}>
      { piece && <Piece piece={piece} position={position} /> }
    </StyledSquare>
  );
};


Square.propTypes = {
  primary: propTypes.bool,
};


export default Square;
