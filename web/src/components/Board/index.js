import React from 'react';
import styled from 'styled-components';
import Square from './Square';

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

const rowVals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const colVals = ['8', '7', '6', '5', '4', '3', '2', '1'];

const temp = Array.from(Array(64).keys());

const Board = ({ squares }) => {

  console.info(temp)
  return (
    <Background>
      {squares.map((square) => {
        // ?: May clean up this statement if it is just too declaritive
        // const isWhite = ((v + Number(Math.floor(v/8) % 2 === 0)) % 2) === 1 ? true : false;

        // const rowIndex = Math.floor(v/8);
        // const colIndex = v % 8;
        // const position = rowVals[rowIndex] + colVals[colIndex];

        return (<Square primary={square.side} />)
      })}
    </Background>
  );
};


export default Board;
