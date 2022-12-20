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

const moveLog = [ [ 'e4', 'e5' ], [ 'Nf3', 'Nc6' ], [ 'd4', 'exd4' ], [ 'Nxd4', 'Nf6' ], [ 'Nxc6', 'bxc6' ], [ 'e5', 'Qe7' ], [ 'Qe2', 'Nd5' ], [ 'c4', 'Qb4+' ], [ 'Nd2', 'Nf4' ], [ 'Qe3', 'Ng6' ], [ 'Bd3', 'Bc5' ], [ 'Qg3', 'O-O' ], [ 'O-O', 'd6' ], [ 'Nb3', 'Nxe5' ], [ 'a3', 'Qb6' ], [ 'Nxc5', 'Qxc5' ], [ 'Be3', 'Qa5' ], [ 'b4', 'Qa4' ], [ 'Bd4', 'f6' ], [ 'Bxe5', 'fxe5' ], [ 'f4', 'Bf5' ], [ 'fxe5', 'Bxd3' ], [ 'Qxd3', 'dxe5' ], [ 'Qd7', 'Qb3' ], [ 'Qxc6', 'Qe3+' ], [ 'Kh1', 'Kh8' ], [ 'Rfe1', 'Qc3' ], [ 'Qxc7', 'Rac8' ], [ 'Qxa7', 'Rxc4' ], [ 'h3', 'Rcf4' ], [ 'Qc5', 'Qb2' ], [ 'Qxe5', 'Qb3' ], [ 'Qe3', 'Qc4' ], [ 'Rac1', 'Qf7' ], [ 'Qg3', 'h6' ], [ 'b5', 'Qd5' ], [ 'a4', 'Rxa4' ], [ 'Rb1', 'Rf5' ], [ 'b6', 'Rg5' ], [ 'b7', 'Qxb7' ], [ 'Qxg5' ] ];

const Game = ({ game, resign, children }) => {
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
        if (piece && piece.side === game.currentTurnSide) {
          setSelectedPiecePos(pos);
          moveController.selectSquare(pos);
        };
      };
    };
  }, [selectedPiecePos, moveController, gameLoaded]);

  return (
      gameLoaded && moveController && gameData && (
        <Container>
          <Board squares={gameData} update={selectPiece}/>
          <Menu undo={moveController.undo} resign={resign} moveLog={moveLog}>
            {children}
          </Menu>
        </Container>
      )
  )
}

export default Game;
