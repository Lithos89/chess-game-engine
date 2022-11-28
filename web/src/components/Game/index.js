import React from 'react';
import Board from '../Board';

import { Game as GameModel } from 'chess-engine';

const Game = () => {

  const gameModel = new GameModel();
  const squares = gameModel.squares;

  return <Board squares={squares}/>
}

export default Game;
