// Core
import { useState, useEffect, Fragment, useCallback } from 'react';
import Chess from 'chess-engine';

// Components
import Board from '../ChessBoard/Board';

const Game = ({ game }) => {
  const [gameData, setGameData] = useState([]);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [moveController, setMoveController] = useState(null);
  const [selectedPiecePos, setSelectedPiecePos] = useState(null);

  useEffect(() => {
    Chess.setGameObserver(setGameData, game);
    setMoveController(game.moveController);
    setGameLoaded(true);
  }, [game])

  // Piece Selection
  const selectPiece = useCallback((pos, piece) => {
    if (gameLoaded) {
      if (selectedPiecePos) {
          if (pos !== selectedPiecePos) {
            moveController.requestMove(selectedPiecePos, pos);
          };
          setSelectedPiecePos(null);
          moveController.selectPiece(pos);
      } else {
        if (piece) {
          setSelectedPiecePos(pos);
          moveController.selectPiece(pos);
        };
      };
    };
  }, [selectedPiecePos, moveController, gameLoaded]);

  return (
      gameLoaded && moveController && gameData && (
        <Fragment>
          <Board squares={gameData} update={selectPiece} highlight={moveController.select} />
          <button onClick={moveController.undo}> Undo </button>
        </Fragment>
      )
  )
}

export default Game;
