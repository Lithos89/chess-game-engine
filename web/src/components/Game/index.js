// Core
import { useState, useEffect, Fragment } from 'react';

// Components
import Board from '../ChessBoard/Board';

// Hooks
// import useBoardLayout from 'hooks/board/useBoardLayout';


const Game = ({ boardSquares, update, highlight }) => {

  return (
    <Board squares={boardSquares} update={update} highlight={highlight} />
  )
}

export default Game;
