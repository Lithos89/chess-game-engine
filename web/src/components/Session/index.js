import { Fragment, useEffect, useState } from 'react';

// Modules
import { startSession } from 'chess-engine';

// Components
import Game from '../Game';

// const { matchController, matchObserver } = startSession();

const { matchController } = startSession();

const Session = () => {

  const [matchInfo, setMatchInfo] = useState(null);

  const [boardSquares, setBoardSquares] = useState([]);

  // TODO: Move the movement Fntion into a custom hook
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

  // console.log(boardSquares[0])

  const resign = () => {
    setMoveController(matchController.resign());
  };

  return (
    <Fragment>
      {
        matchLoaded && moveController && (
          <Fragment>
            <Game boardSquares={boardSquares} update={selectPiece} highlight={moveController.select} />
            <button onClick={resign}> Resign </button>
            <button onClick={moveController.undo}> Undo </button>
          </Fragment>
        )
      }
      { matchInfo && (
        <Fragment>
          <h1>Side: {matchInfo.currentSide}</h1>
          <h5>You: {matchInfo.wins.player}   Computer: {matchInfo.wins.opponent}</h5>
        </Fragment>
      )}
    </Fragment>
  )
};

export default Session;
