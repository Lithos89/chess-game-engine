import { useState, useEffect } from 'react';

import Chess from 'chess-engine';

const chessSession = Chess.startSession();

const temp = () => {
  const match = chessSession.newMatch();

  const [matchInfo, setMatchInfo] = useState();
  const [gameData, setGameData] = useState();

  const [selectedPiecePos, setSelectedPiecePos] = useState(null);
  const [selectPiece, setSelectPiece] = useState(() => () => {});

  // Current Implementation

  match.setObserver(setMatchInfo);

  const game = chessSession.newGame();

  game.setObserver(setGameData)



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const [matchInfo, setMatchInfo] = useState(null);

  const [matchLoaded, setMatchLoaded] = useState(false);

  // Initial Match Load
  useEffect(() => {
    if (!matchLoaded) {
      matchController.observe(setMatchInfo);

      setMoveController(moveController);
      setMatchLoaded(true);
    };
    // TODO: Add in here match generated catch here to prevent pre-rendering
  }, [matchLoaded]);

  // Piece Selection
  useEffect(() => {
    if (matchLoaded) {
      if (selectedPiecePos) {
        setSelectPiece(() => (pos) => {
          if (pos !== selectedPiecePos) {
            moveController.move(selectedPiecePos, pos)
          }
          setSelectedPiecePos(null)
          moveController.select(pos)
        })
      } else {
        setSelectPiece(() => (pos, piece) => {
          if (piece) {
            setSelectedPiecePos(pos)
            moveController.select(pos)
          }
        })
      }
    }
  }, [selectedPiecePos, matchLoaded, moveController]);
}

const useChess = () => {

  const [matchInfo, setMatchInfo] = useState(null);

  const [boardSquares, setBoardSquares] = useState([]);

  // TODO: Move the movement Function into a custom hook
  const [moveController, setMoveController] = useState(null);

  const [selectedPiecePos, setSelectedPiecePos] = useState(null);
  const [selectPiece, setSelectPiece] = useState(() => () => {});

  // const [matchInfo, setMatchInfo] = useState(null);

  const [matchLoaded, setMatchLoaded] = useState(false);

  // Initial Match Load
  useEffect(() => {
    if (!matchLoaded) {
      matchController.observe(setMatchInfo);
      const moveController = matchController.generateGame(setBoardSquares);
      
      /*
        What I would like for a game to be returned where it is setup with a callback like the above call
        however, what I plan to have happen is for it to return chess where [chess, setChess] is returned

        if would look something like this

        {
          boardSquares: All the info relevant to the boardSquares,
          matchStats: All the info relevant to the match
          moveController: the available moves that are available (currently: move, highlight, undo),
          matchController: the controls that are available for the match (currently: resign, startNewGame),
        }
      */

      setMoveController(moveController);
      setMatchLoaded(true);
    }
    // TODO: Add in here match generated catch here to prevent pre-rendering
  }, [matchLoaded]);

  // Piece Selection
  useEffect(() => {
    if (matchLoaded) {
      if (selectedPiecePos) {
        setSelectPiece(() => (pos) => {
          if (pos !== selectedPiecePos) {
            moveController.move(selectedPiecePos, pos)
          }
          setSelectedPiecePos(null)
          moveController.select(pos)
        })
      } else {
        setSelectPiece(() => (pos, piece) => {
          if (piece) {
            setSelectedPiecePos(pos)
            moveController.select(pos)
          }
        })
      }
    }
  }, [selectedPiecePos, matchLoaded, moveController]);


  // const 
};

export default useChess;
