
import propTypes from 'prop-types';

// Components
import Piece from '../Piece';

// Styling
import styled, { css } from 'styled-components';

const StyledSquare = styled.div`
  display: flex;
  background-color: ${p => p.action ? 'blue' : p.isHighlighted ? 'red' : p.primary ? 'white' : '#CCC'};
  flex: 0 0 12.5%;
  aspect-ratio: 1 / 1;

  ${p => (p.action || p.isHighlighted || p.piece) && css`
    cursor: pointer;
  `}
`;


const Square = ({ color, position, piece, update, isHighlighted, action }) => {
  const isLight = color === 'light';

  const move = () => {
    if (update) {
      update(position, piece);
    }
  }

  return (
    <StyledSquare primary={isLight} isHighlighted={isHighlighted} action={action} onClick={move} piece={piece}>
      { piece && <Piece piece={piece} position={position} /> }
    </StyledSquare>
  );
};


Square.propTypes = {
  primary: propTypes.bool,
};


export default Square;
