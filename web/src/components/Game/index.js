import React from 'react';
import Board from '../Board';

import { Game as GameModel } from '../../engine/Game.js';

const Game = () => {

  const gameModel = new GameModel();

  return <Board squares={gameModel.squares}/>
}

export default Game;
