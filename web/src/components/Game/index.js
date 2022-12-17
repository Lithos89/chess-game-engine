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
    setMoveController(game);
    setGameLoaded(true);
  }, [game])

  // Piece Selection
  const selectPiece = useCallback((pos, piece) => {
    if (gameLoaded) {
      if (selectedPiecePos) {
        console.log('a')
          if (pos !== selectedPiecePos) {
            const isMoved = moveController.requestMove(selectedPiecePos, pos);

            if (isMoved) {
              setSelectedPiecePos(null);
              moveController.selectPiece(pos);
            }
          } else {
            setSelectedPiecePos(null);
            moveController.selectPiece(pos);
          };
      } else {
        if (piece && piece.side === game.currentTurnSide) {
          console.log('b')
          setSelectedPiecePos(pos);
          moveController.selectPiece(pos);
        };
      };
    };
  }, [selectedPiecePos, moveController, gameLoaded]);

  return (
      gameLoaded && moveController && gameData && (
        <Fragment>
          <Board squares={gameData} update={selectPiece}/>
          <button onClick={moveController.undo}> Undo </button>
        </Fragment>
      )
  )
}

export default Game;
