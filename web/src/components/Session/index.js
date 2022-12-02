import { startSession } from 'chess-engine';

import Game from '../Game';

const Session = () => {
  const { matchController, showcase } = startSession();

  const squares = matchController.start();

  console.log(squares)

  return (
    <Game resetFunc={matchController.reset} newSquares={squares} showcase={showcase} />
  )
};

export default Session;