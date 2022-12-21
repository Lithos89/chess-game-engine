
import styled from 'styled-components';

const Container = styled.div`
  height: 200px;
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

// const MoveSubCell = styled.div`
//   background-color: #ccc;
//   display: inline-block;
//   border-radius: 5px;
//   padding: 2px 4px;
// `;

const MoveHistory = ({ moveLog }) => {

  // const moveLog = [ [ 'e4', 'e5' ], [ 'Nf3', 'Nc6' ], [ 'd4', 'exd4' ], [ 'Nxd4', 'Nf6' ], [ 'Nxc6', 'bxc6' ], [ 'e5', 'Qe7' ], [ 'Qe2', 'Nd5' ], [ 'c4', 'Qb4+' ], [ 'Nd2', 'Nf4' ], [ 'Qe3', 'Ng6' ], [ 'Bd3', 'Bc5' ], [ 'Qg3', 'O-O' ], [ 'O-O', 'd6' ], [ 'Nb3', 'Nxe5' ], [ 'a3', 'Qb6' ], [ 'Nxc5', 'Qxc5' ], [ 'Be3', 'Qa5' ], [ 'b4', 'Qa4' ], [ 'Bd4', 'f6' ], [ 'Bxe5', 'fxe5' ], [ 'f4', 'Bf5' ], [ 'fxe5', 'Bxd3' ], [ 'Qxd3', 'dxe5' ], [ 'Qd7', 'Qb3' ], [ 'Qxc6', 'Qe3+' ], [ 'Kh1', 'Kh8' ], [ 'Rfe1', 'Qc3' ], [ 'Qxc7', 'Rac8' ], [ 'Qxa7', 'Rxc4' ], [ 'h3', 'Rcf4' ], [ 'Qc5', 'Qb2' ], [ 'Qxe5', 'Qb3' ], [ 'Qe3', 'Qc4' ], [ 'Rac1', 'Qf7' ], [ 'Qg3', 'h6' ], [ 'b5', 'Qd5' ], [ 'a4', 'Rxa4' ], [ 'Rb1', 'Rf5' ], [ 'b6', 'Rg5' ], [ 'b7', 'Qxb7' ], [ 'Qxg5' ] ];

  // const whiteMoves = [], blackMoves = [];
  // moveLog.forEach((val) => {
  //   whiteMoves.push(val[0]);
  //   blackMoves.push(val[1]);
  // });


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

  /*
    1. e4 e5
    2. Nf3 Nc6
    3. d4 exd4
    4. Nxd4 Nf6
    5. Nxc6 bxc6
    6. e5 Qe7
    7. Qe2 Nd5
    8. c4 Qb4+
    9. Nd2 Nf4
    10. Qe3 Ng6
    11. Bd3 Bc5
    12. Qg3 O-O
    13. O-O d6
    14. Nb3 Nxe5
    15. a3 Qb6
    16. Nxc5 Qxc5
    17. Be3 Qa5
    18. b4 Qa4
    19. Bd4 f6
    20. Bxe5 fxe5
    21. f4 Bf5
    22. fxe5 Bxd3
    23. Qxd3 dxe5
    24. Qd7 Qb3
    25. Qxc6 Qe3+
    26. Kh1 Kh8
    27. Rfe1 Qc3
    28. Qxc7 Rac8
    29. Qxa7 Rxc4
    30. h3 Rcf4
    31. Qc5 Qb2
    32. Qxe5 Qb3
    33. Qe3 Qc4
    34. Rac1 Qf7
    35. Qg3 h6
    36. b5 Qd5
    37. a4 Rxa4
    38. Rb1 Rf5
    39. b6 Rg5
    40. b7 Qxb7
    41. Qxg5
  */