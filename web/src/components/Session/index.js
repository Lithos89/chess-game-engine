import { useState } from 'react';

// Modules
import { startSession } from 'chess-engine';

// Components
import Game from '../Game';

const { matchController, showcase } = startSession();
const initialGame = matchController.generateGame();

const Session = () => {

  const [boardSquares, tempSetBoardSquares] = useState(Object.entries(initialGame).map(([pos, val]) => ({
    position: pos,
    square: val
  })));

  const setBoardSquares = (temp) => tempSetBoardSquares(Object.entries(temp).map(([pos, val]) => ({
    position: pos,
    square: val
  })));

  const resetSquares = () => {
    tempSetBoardSquares(Object.entries(matchController.generateGame()).map(([pos, val]) => ({
      position: pos,
      square: val
    }))); 
  };

  console.log(boardSquares)

  return (
    <Game boardSquares={boardSquares} setBoardSquares={setBoardSquares} resetSquares={resetSquares} showcase={showcase} />
  )
};

export default Session;
