
import { useState, useEffect, Fragment, useCallback } from 'react';
import Chess from 'chess-engine';

// Components
import Board from '../ChessBoard/Board';
import Menu from './Menu';

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  max-height: 100vh;
  justify-content: stretch;

  @media ${devices.tablet} {
    min-width: 80%;
    flex-direction: row;
    align-items: stretch;
    margin: 2vh 1rem;
  };

  @media ${devices.laptop} {
    min-width: 80%;
    max-width: 90%;
  };

  background-color: #000;
`;

const Spacer = styled.div`
  flex: 0;

  @media ${devices.tablet} {
    flex: 0.2;
  }
`;

const Game = ({ gameId, matchInfo }) => {
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
      gameLoaded && gameData && moveController !== null ? (
        <Container>
          <Board
            squares={gameData.board}
            update={!gameData.finished ? selectPiece : () => {}}
            captures={gameData.captures}
            matchInfo={matchInfo}
          />
          <Spacer />
          <Menu
            undo={!gameData.finished ? moveController.undo : () => {}}
            resign={moveController.resign}
            moveLog={gameData.moveLog}
            captures={gameData.captures}
            next={gameData.finished ? moveController.startNext : null}
          >
          </Menu>
        </Container>
      ) : (
      <Container>
        <Board />
        <Spacer />
        <Menu />
      </Container>
      )
  );
};

export default Game;
