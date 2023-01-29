
// Components
import Square from 'components/ChessBoard/Square';

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const BoardContainer = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  background-color: brown;
  flex-wrap: wrap;
  flex: 7;

  /* padding: 5px; */

  @media ${devices.tablet} {
    padding: 20px;
  }
  /* border: 5px brown solid; */
`;

const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

const tempSquares = columns.flatMap((col, i) => 
rows.map((row, j) => {
  const _index = i * 8 + j;

  const regex = /b|d|f|h/;
  const isEvenRow = regex.test(col);

  const shade = (_index % 8 + Number(isEvenRow)) % 2 === 0 ? 'dark' : 'light';
  return <Square key={_index} color={shade} />
})
);

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


  const temp = squares ?
    squares.map(({position, square, piece }) => (
        <Square
          key={position}
          color={square.color}
          position={position}
          piece={piece}
          update={update}
          isHighlighted={square.focus.highlighted}
          action={square.focus.action}
        />
      )
    ) : 
    tempSquares;

    console.log(temp)
    
  return (
    <BoardContainer>
        {temp}
    </BoardContainer>
  );
};


export default Board;
