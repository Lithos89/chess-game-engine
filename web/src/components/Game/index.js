import { useState, useEffect, Fragment } from 'react';
import Board from '../ChessBoard/Board';

const Game = ({ resetFunc, newSquares, showcase }) => {


  // Move this into a function that is passed from the model
  const [squares, setSquares] = useState(newSquares);


  // const startNextGame = () => {
  //   setCurrentGame(nextGame().value);
  // };

  const [refresh, setRefresh] = useState(false);

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
    <Fragment>
      {squares && (
        <Board squares={squares} update={setRefresh} />
      )}
      {/* <button onClick={() => { resetFunc(); setRefresh(true); }}> Restart </button> */}
      <button onClick={() => { setSquares(resetFunc()); setRefresh(true); }}> Restart </button>
    </Fragment>
  )
}

export default Game;
