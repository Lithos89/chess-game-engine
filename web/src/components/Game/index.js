import { useState, useEffect, Fragment } from 'react';
import Board from '../ChessBoard/Board';
import Menu from './Menu';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #000;
  padding: 10px;
  margin: 0 15%;
`;

const Game = ({ game, resign, children }) => {
  const [gameData, setGameData] = useState([]);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [moveController, setMoveController] = useState(null);
  const [selectedPiecePos, setSelectedPiecePos] = useState(null);

  useEffect(() => {
    // console.log(refresh)
    if (refresh === true) {
      // setSquares(newSquares);
      setRefresh(false);
    }
    
  }, [squares, refresh]);

  // useEffect(() => {
  //   setCurrentGame(nextGame().value);
  //   setSquares(currentGame.boardController.boardSquares);
  // }, [])

  console.log(newSquares)


  return (
      gameLoaded && moveController && gameData && (
        <Container>
          <Board squares={gameData} update={selectPiece}/>
          <Menu undo={moveController.undo} resign={resign}>
            {children}
          </Menu>
        </Container>
      )
  )
}

export default Game;
