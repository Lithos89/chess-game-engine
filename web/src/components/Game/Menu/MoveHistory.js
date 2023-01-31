
// Styling
import styled from 'styled-components';

const Container = styled.div`
  flex: 1 1 0;
  position: static;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 auto;
  margin: 10px;
`;

const MoveCell = styled.div`
  text-align: start;
  align-items: start;
  padding: 5px;
  display: flex;
  background-color: #fff;

  :nth-child(odd) {
    background-color: #ddd;
  }
`;

const MoveIndex = styled.h5`
  flex: 1;
  text-align: start;
  padding-right: 2px;
`;

const MoveWhite = styled.h5`
  flex: 3 1;
  text-align: start;
`;

const MoveBlack = styled.h5`
  flex: 7 1;
  text-align: start;
`;

const MoveHistory = ({ moveLog }) => {


  return (
    <Container>
      { moveLog &&
        moveLog.reverse().map((move, i) => {
          return (
            <MoveCell key={i}>
              <MoveIndex>{i + 1}.</MoveIndex>
              <MoveWhite>{move[0]}</MoveWhite>
              <MoveBlack>{move[1]}</MoveBlack>
            </MoveCell>
          );
        })
      }
    </Container>
  );
};

export default MoveHistory;