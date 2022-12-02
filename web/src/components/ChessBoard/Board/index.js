import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Square from 'components/ChessBoard/Square';

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const Background = styled.div`
  display: flex;
  background-color: brown;
  flex-wrap: wrap;
  width: 70%;
  padding: 20px;
  /* border: 5px brown solid; */
`;

// *: This component will control the orientation of the boards and the subsequent squares, as well as have positions on side
const Board = ({ squares, update }) => {

  const square2 = squares['d4'];
  return (
    <Background>
      {
        Object.entries(squares)
          .map(([position, square]) => (
            <Square key={position} square={square} square2={square2} color={square.color} position={position} piece={square.piece} update={update}/>
          ))
      }
    </Background>
  );
};


export default Board;
