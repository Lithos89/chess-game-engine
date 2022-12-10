import { Fragment, useEffect, useState, useReducer, useCallback } from 'react';

// Modules
import {startSession} from 'chess-engine';

// Components
import Game from '../Game';

// const { matchController, matchObserver } = startSession();

const session = startSession();

const match = session.newMatch();

const Session = () => {

  // const [matchInfo, setMatchInfo] = useState(null);
  // const [gameData, setGameData] = useState([]);

  // const [matchLoaded, setMatchLoaded] = useState(false);

  // function reducer(state, action) {
  //   switch(action.type) {
  //     case 'new-match': {
  //       const match = session.newMatch();
  //       match.setObserver(setMatchInfo);
        
  //       const game = match.startNewGame(setGameData);
  //       // game.setObserver(setGameData);
  //       return { match, game };
  //     }
  //     case 'new-game': {
  //       const game = state.match.startNewGame(setGameData);
  //       // game.setObserver(setGameData);
  //       return { ...state, game };
  //     }
  //     case 'resign': {
  //       // const game = state.match.resign();
  //       // game.setObserver(setGameData);
  //       // return { game };

  //       const game = state.match.startNewGame(setGameData);
  //       // game.setObserver(setGameData);
  //       return {...state, game};
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!matchLoaded) {
  //     setMatchLoaded(true);
  //     dispatch({ type: 'new-match' })
  //     console.info("match not loaded")
  //   } else {
  //     console.info("match loaded")
  //   };
  //   // TODO: Add in here match generated catch here to prevent pre-rendering
  // }, []);
  
  // const [state, dispatch] = useReducer(reducer, {});

  // const [selectedPiecePos, setSelectedPiecePos] = useState(null);
  // const selectPiece = useCallback((pos, piece) => {

  //   if (matchLoaded && state.game) {
  //     if (selectedPiecePos) {
  //       if (pos !== selectedPiecePos) {
  //         state.game.move(selectedPiecePos, pos)
  //       }
  //       setSelectedPiecePos(null)
  //       state.game.select(pos)
  //     } else {
  //       if (piece) {
  //         setSelectedPiecePos(pos)
  //         state.game.select(pos)
  //       }
  //     }
  //   }
  // }, [selectedPiecePos, matchLoaded, state.game])


  // console.info(matchInfo)

////////////////////////////////////////////////////////////////////////////////////////////////////////



  const [matchInfo, setMatchInfo] = useState(null);

  const [gameData, setGameData] = useState([]);

  // TODO: Move the movement Function into a custom hook
  const [matchController, setMatchController] = useState(null);
  const [moveController, setMoveController] = useState(null);

  const [selectedPiecePos, setSelectedPiecePos] = useState(null);

  // const [matchInfo, setMatchInfo] = useState(null);

  const [matchLoaded, setMatchLoaded] = useState(false);

  // Initial Match Load
  useEffect(() => {
    // if (!matchLoaded) {
      // matchController.observe(setMatchInfo);
      // const moveController = matchController.generateGame(setBoardSquares);


      match.setObserver(setMatchInfo);
      setMatchController(match);

      const game = match.startNewGame(setGameData);
      // game.setObserver(setGameData);
      
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

      setMoveController(game);
      setMatchLoaded(true);
      console.info("match loaded: " + matchLoaded)
    // }
    // TODO: Add in here match generated catch here to prevent pre-rendering
  }, []);

  // Piece Selection
  const selectPiece = useCallback((pos, piece) => {
    if (matchLoaded) {
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
  }, [selectedPiecePos, matchLoaded, moveController]);

  const resign = () => {
    setMoveController(matchController.resignGame());
  };

  return (
    <Fragment>
      {
        matchLoaded && gameData && moveController && (
          <Fragment>
            <Game boardSquares={gameData} update={selectPiece} highlight={moveController.select} />
            <button onClick={resign}> Resign </button>
            <button onClick={moveController.undo}> Undo </button>
          </Fragment>
        )
      }
      { matchInfo && (
        <Fragment>
          <h1>Side: {matchInfo.currentSide}</h1>
          <h5>You: {matchInfo.wins.player}   Computer: {matchInfo.wins.opponent}</h5>
          <h4>{matchInfo.games}</h4>
        </Fragment>
      )}
    </Fragment>
  )
};

export default Session;
