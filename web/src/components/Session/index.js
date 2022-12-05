import { Fragment, useEffect, useState } from 'react';

// Modules
import { startSession } from 'chess-engine';

// Components
import Game from '../Game';

const { matchController, showcase } = startSession();
// const initialGame = matchController.generateGame();

const Session = () => {

  const [newBoardSquares, setNewBoardSquares] = useState([]);

  // TODO: Move the movement function into a custom hook
  const [moveFunc, setMoveFunc] = useState(() => () => {});
  const [pieceSelected, setPieceSelected] = useState(null);

  const [selectPiece, setSelectPiece] = useState()

  const [gameLoaded, setGameLoaded] = useState(false);

  // Initial Game Load
  useEffect(() => {
    if (!gameLoaded) {
      const move = matchController.generateGame(setNewBoardSquares);
      setMoveFunc(() => (a,b) => {move(a,b)});
      setGameLoaded(true);
    }
    // TODO: Add in here match generated catch here to prevent pre-rendering
  }, [gameLoaded]);

  // Piece Selection
  useEffect(() => {
    console.log(pieceSelected)
    if (pieceSelected) {
      setSelectPiece(() => (pos) => {
        if (pos !== pieceSelected) {
          moveFunc(pieceSelected, pos)
        }
        setPieceSelected(null)
      })
    } else {
      setSelectPiece(() => (pos) => {
        setPieceSelected(pos)
      })
    }
  }, [pieceSelected, moveFunc])


  // const [boardSquares, tempSetBoardSquares] = useState(Object.entries(initialGame).map(([pos, val]) => ({
  //   position: pos,
  //   square: val
  // })));

  // const setBoardSquares = (temp) => tempSetBoardSquares(Object.entries(temp).map(([pos, val]) => ({
  //   position: pos,
  //   square: val
  // })));

  // const resetSquares = () => {
  //   tempSetBoardSquares(Object.entries(matchController.generateGame()).map(([pos, val]) => ({
  //     position: pos,
  //     square: val
  //   }))); 
  // };

  // console.log(boardSquares)

  return (
    <Fragment>
      { gameLoaded ? (
        <Fragment>
          <Game boardSquares={newBoardSquares} update={selectPiece} />
          <button onClick={() => { matchController.generateGame(setNewBoardSquares); }}> Restart </button>
        </Fragment>
        ) : null
      }
    </Fragment>
  )
};

export default Session;
