
// Core
import { useState, useEffect, Fragment, useCallback } from 'react';
import Chess from 'chess-engine';

// Components
import Board from '../ChessBoard/Board';
import Menu from './Menu';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #000;
  padding: 10px;
  margin: 0 15%;
`;

const Game = ({ gameId, resign, children }) => {
  const [gameData, setGameData] = useState(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [moveController, setMoveController] = useState(null);
  const [selectedPiecePos, setSelectedPiecePos] = useState(null);

  useEffect(() => {
    if (gameId) {
      Chess.setGameObserver(setGameData, gameId);
      setGameLoaded(true);
    }
  }, [gameId]);

  useEffect(() => {
    if (gameData && "moveController" in gameData) {
      setMoveController(gameData.moveController)
    }
  }, [gameData]);

  // Piece Selection
  const selectPiece = useCallback((pos, piece) => {
    if (gameLoaded) {
      if (selectedPiecePos) {
          if (pos !== selectedPiecePos) {
            const isMoved = moveController.move(selectedPiecePos, pos);

            if (isMoved) {
              setSelectedPiecePos(null);
              moveController.selectSquare(pos);
            }
          } else {
            setSelectedPiecePos(null);
            moveController.selectSquare(pos);
          };
      } else {
        if (piece && piece.side === gameData.currentTurnSide) {
          setSelectedPiecePos(pos);
          moveController.selectSquare(pos);
        };
      };
    };
  }, [selectedPiecePos, moveController, gameLoaded]);

  return (
      gameLoaded && gameData && moveController !== null && (
        <Container>
          <Board
            squares={gameData.board}
            update={!gameData.finished ? selectPiece : () => {}}
          />
          <Menu
            undo={!gameData.finished ? moveController.undo : () => {}}
            resign={moveController.resign}
            moveLog={gameData.moveLog}
            captures={gameData.captures}
            next={gameData.finished ? moveController.startNext : null}
          >
            {children}
          </Menu>
        </Container>
      )
  );
};

export default Game;
