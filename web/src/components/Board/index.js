import styled from 'styled-components';

import Square from 'components/Square';

// Just setting up a test implementation for the background to get it to work on the screen
const Background = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  border: 5px blue solid;
`;


/*
  Consider passing in a prop that takes in the chess model to pass the props to the different squares 
  to handle the logic if a eice is allowed to pass through it to allow
*/

// *: This component will control the orientation of the boards and the subsequent squares, as well as have positions on side
const Board = ({ squares }) => {

  console.info(squares)
  return (
    <Background>
      {
        Object.entries(squares)
          .map(([position, square]) => <Square key={position} color={square.side} position={position} piece={square.piece}/>)
      }
    </Background>
  );
};


export default Board;
