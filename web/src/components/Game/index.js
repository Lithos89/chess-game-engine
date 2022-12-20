import { useState, useEffect, Fragment } from 'react';
import Board from '../ChessBoard/Board';
import Menu from './Menu';

<<<<<<< Updated upstream
const Game = ({ resetFunc, newSquares, showcase }) => {


  // Move this into a function that is passed from the model
  const [squares, setSquares] = useState(newSquares);


  // const startNextGame = () => {
  //   setCurrentGame(nextGame().value);
  // };

  const [refresh, setRefresh] = useState(false);
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <Fragment>
      {squares && (
        <Board squares={squares} update={setRefresh} />
      )}
      {/* <button onClick={() => { resetFunc(); setRefresh(true); }}> Restart </button> */}
      <button onClick={() => { setSquares(resetFunc()); setRefresh(true); }}> Restart </button>
    </Fragment>
=======
      gameLoaded && moveController && gameData && (
        <Container>
          <Board squares={gameData} update={selectPiece}/>
          <Menu undo={moveController.undo} resign={resign}>
            {children}
          </Menu>
        </Container>
      )
>>>>>>> Stashed changes
  )
}

export default Game;
