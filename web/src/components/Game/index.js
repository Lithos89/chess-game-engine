// Core
import { useState, useEffect, Fragment } from 'react';

// Components
import Board from '../ChessBoard/Board';

// Hooks
import useBoardLayout from 'hooks/board/useBoardLayout';


const Game = ({ boardSquares, setBoardSquares, resetSquares, showcase }) => {


  // Move this into a function that is passed from the model


  // const startNextGame = () => {
  //   setCurrentGame(nextGame().value);
  // };

  // const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   if (refresh) {
  //     setRefresh(false);
  //   }
  // }, [refresh]);


  // useEffect(() => {
  //   setCurrentGame(nextGame().value);
  //   setSquares(currentGame.boardController.boardSquares);
  // }, [])


  return (
    <Fragment>
      <Board squares={boardSquares} update={setBoardSquares} />
      {/* <button onClick={() => { resetFunc(); setRefresh(true); }}> Restart </button> */}
      <button onClick={() => { resetSquares(); }}> Restart </button>
    </Fragment>
  )
}

export default Game;
