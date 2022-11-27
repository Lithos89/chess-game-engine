import React from 'react';
import Board from '../Board';

import { Game as GameModel } from 'chess-engine';

const Game = () => {

  const gameModel = new GameModel();
  console.log(Object.keys(gameModel.squares).length)

  return <Board squares={gameModel.squares}/>
}

export default Game;
