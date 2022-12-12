// Core
import { useState, useEffect, Fragment, useCallback } from 'react';

import { setGameObserver } from 'chess-engine';

// Components
import Board from '../ChessBoard/Board';

// Hooks
// import useBoardLayout from 'hooks/board/useBoardLayout';



const Game = ({ match }) => {

  const [gameData, setGameData] = useState([]);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [moveController, setMoveController] = useState(null);
  const [selectedPiecePos, setSelectedPiecePos] = useState(null);

  useEffect(() => {
    const game = match.startNewGame();
    setMoveController(game);
    setGameObserver(setGameData);
    setGameLoaded(true)
  }, []);

  // Piece Selection
  const selectPiece = useCallback((pos, piece) => {
    if (gameLoaded) {
      if (selectedPiecePos) {
          if (pos !== selectedPiecePos) {
            moveController.move(selectedPiecePos, pos)
          }
          setSelectedPiecePos(null)
          moveController.select(pos)
      } else {
        if (piece) {
          setSelectedPiecePos(pos)
          moveController.select(pos)
        }
      }
    }
  }, [selectedPiecePos, moveController]);

  return (
      gameLoaded && moveController && (
        <Board squares={gameData} update={selectPiece} highlight={moveController.select} />
      )
  )
}

export default Game;
