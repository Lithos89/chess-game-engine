import styled from 'styled-components';

import Square from 'components/ChessBoard/Square';

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const Background = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  background-color: brown;
  flex-wrap: wrap;
  width: 70%;
  padding: 20px;
  /* border: 5px brown solid; */
`;

// *: This component will control the orientation of the boards and the subsequent squares, as well as have positions on side
const Board = ({ squares, update }) => {

  // // !: Just a temporary solution, in the future the array will be preprocessed for the client
  // const n = Math.sqrt(squares.length);
  // const squaresT = [] = squares.map((_, i, a) => a[(i % n) * n + Math.floor(i / n)]);
  
  // return (
  //   <Background>
  //       {
  //         squaresT.reverse().map(({position, square, piece }) => {
  //           return (
  //             <Square key={position} color={square.color} position={position} piece={piece} update={update} isHighlighted={square.focus.highlighted} />
  //           )
  //         })
  //       }
  //   </Background>
  // );

  return (
    <Background>
        {
          squares.map(({position, square, piece }) => {
            return (
              <Square key={position} color={square.color} position={position} piece={piece} update={update} isHighlighted={square.focus.highlighted} />
            )
          })
        }
    </Background>
  );
};


export default Board;
