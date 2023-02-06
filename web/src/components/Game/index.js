
import { useState, useEffect, Fragment, useCallback } from 'react';
import Chess from 'chess-engine';

// Components
import Board from '../ChessBoard/Board';
import Menu from './Menu';
import SideDisplay from "components/UI/SideDisplay";

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  /* max-height: 100vh; */
  justify-content: stretch;

  background-color: #000;

  @media ${devices.tablet} {
    justify-content: initial;
    min-width: 0;
    flex-direction: row;
    align-items: stretch;
    align-content: start;
    margin: auto 5vh;
  };

  @media ${devices.laptop} {
    margin: auto 10vw;
  };

  @media ${devices.laptopL} {
    margin: auto 15vw;
  };
`;

const Spacer = styled.div`
  flex: 0;

  @media ${devices.tablet} {
    flex: 0.2;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: ${p => p.reverse ? "column-reverse" : "column"};
  align-items: stretch;

  @media ${devices.mobileL} {
    /* padding: 10px; */ 
  };

  @media ${devices.tablet} {
    max-width: 70vh;
    flex: 1 1 600px;
  };

  @media ${devices.laptop} {
    max-width: 80vh;
  }
`;

const Temp2Container = styled.div`
  flex: 1;

  @media ${devices.laptopL} {
    flex: 0;
  };
`;

const Game = ({ gameId, matchInfo, isSinglePlayer, primaryName, opponentName }) => {
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

  useEffect(() => {
    setSelectedPiecePos(null);
  }, [gameData?.currentTurnSide]);

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
  }, [selectedPiecePos, moveController, gameLoaded, gameData]);

  const primarySide = matchInfo?.currentSide;
  const opponentSide = primarySide === "white" ? "black" : "white"; 


  // TODO: From the gameData prop, get the currentTurnSide value that is provided by the model and seee if it matches with the currentSide to determine whether it is the opponentsTurn
  const primaryTurn = gameData?.currentTurnSide === matchInfo?.currentSide;

  console.info(gameData)

  return (
      gameLoaded && gameData && moveController !== null ? (
        <Container>
          <GameContainer reverse={!isSinglePlayer ? !primaryTurn : false}>
            <SideDisplay
              side={opponentSide}
              // TODO: Add in here a clause that checks on the mode to determine wheter the name should be based on the computer or if it should be player 2
              name={opponentName}
              active={!primaryTurn}
              captures={gameData.captures ? gameData.captures[opponentSide] : {}}
              wins={matchInfo?.wins.opponent}
            />
            <Board
              squares={gameData.board}
              flipped={isSinglePlayer ? primarySide === "black" : gameData.currentTurnSide === "black"}
              update={!gameData.finished ? selectPiece : () => {}}
            />
            <SideDisplay 
              side={primarySide}
              name={primaryName}
              active={primaryTurn}
              captures={gameData.captures ? gameData.captures[primarySide] : {}}
              wins={matchInfo?.wins.player}
            />
            <Temp2Container />
          </GameContainer>

          <Spacer />

          <Menu
            undo={!gameData.finished ? moveController.undo : () => {}}
            resign={moveController.resign}
            moveLog={gameData.moveLog}
            captures={gameData.captures}
            next={gameData.finished ? moveController.startNext : null}
          />
        </Container>
      ) : (
      <Container>
        <GameContainer>
          <SideDisplay side="black" name="" active={false} />
          <Board />
          <SideDisplay side="white" name="" active={false} />
          <Temp2Container />
        </GameContainer>

        <Spacer />
        
        <Menu />
      </Container>
      )
  );
};

export default Game;
