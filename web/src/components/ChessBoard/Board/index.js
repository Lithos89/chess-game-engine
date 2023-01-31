
// Components
import Square from 'components/ChessBoard/Square';

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

const TempContainer = styled.div`
  display: flex;
  max-width: 100vh;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  /* justify-content: stretch; */

  @media ${devices.mobileL} {
    /* padding: 10px; */
  };

  @media ${devices.tablet} {
    flex: 1 1 600px;
    min-height: 0;
    /* padding: 20px; */
  };

  /* @media ${devices.laptopL} {
    flex: 1;
  } */
`;

const Temp2Container = styled.div`
  @media ${devices.mobileL} {
    flex: 3;
  };

  @media ${devices.laptopL} {
    flex: 0;
  };
`;

const Temp3Container = styled.div`
  @media ${devices.mobileL} {
    flex: 1;
  };
  @media ${devices.laptopL} {
    flex: 0;
  };
`;

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const BoardContainer = styled.div`
  flex: 1;

  display: flex;
  flex-wrap: wrap;
  
  background-color: brown;
  /* aspect-ratio: 1 / 1; */
  /* max-height: 100%; */
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
    <TempContainer>
      <Temp3Container/>
      <BoardContainer>
          {temp}
      </BoardContainer>
      <Temp2Container/>
    </TempContainer>
  );
};


export default Board;
