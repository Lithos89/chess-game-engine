import styled from 'styled-components';

import Square from 'components/Square';

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const Background = styled.div`
  display: flex;
  background-color: brown;
  flex-wrap: wrap;
  width: 50%;
  padding: 20px;
  /* border: 5px brown solid; */
`;


/*
  Consider passing in a prop that takes in the chess model to pass the props to the different squares 
  to handle the logic if a piece is allowed to pass through it to allow
*/

// *: This component will control the orientation of the boards and the subsequent squares, as well as have positions on side
const Board = ({ squares }) => {
  console.info(squares)
  return (
    <Background>
      {
        Object.entries(squares)
          .map(([position, square]) => (
            <Square key={position} color={square.color} position={position} piece={square.piece} />
          ))
      }
    </Background>
  );
};


export default Board;
