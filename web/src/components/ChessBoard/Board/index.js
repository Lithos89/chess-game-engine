
// Components
import Square from 'components/ChessBoard/Square';
import SideDisplay from 'components/UI/SideDisplay';

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

const TempContainer = styled.div`
  flex: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  max-width: 88vh;

  @media ${devices.mobileL} {
    /* padding: 10px; */
  };

  @media ${devices.tablet} {
    flex: 1 1 600px;
    min-height: 0;
    /* padding: 20px; */
  };

  @media ${devices.laptopL} {
    /* align-items: center; */
    aspect-ratio: 1 / 1;
  }
`;

const Temp2Container = styled.div`
  width: 100%;

  flex: 1 3;

  /* max-height: 4vh;

  @media ${devices.tablet} {
    max-height: 8vh;
  }; */

  /* @media ${devices.mobileL} {
    flex: 1 1;
  };

  @media ${devices.laptopL} {
    flex: 1;
  }; */
`;

// Determine either to create the background frame of the board dynamically or use an image
// TODO: Add frame to board
const BoardContainer = styled.div`
  flex: 0;

  display: flex;
  flex-wrap: wrap;
  
  background-color: white;
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
const Board = ({ squares, update, captures, matchInfo }) => {

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
    squares.map(({ position, square, piece }) => (
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
      <Temp2Container>
        <SideDisplay side="black" name="Computer" active={false} captures={captures?.black} wins={matchInfo?.wins.opponent} />
      </Temp2Container>
      <BoardContainer>
          {temp}
      </BoardContainer>
      <Temp2Container>
        <SideDisplay side="white" name="You" active={true} captures={captures?.white} wins={matchInfo?.wins.player} />
      </Temp2Container>
    </TempContainer>
  );
};


export default Board;
