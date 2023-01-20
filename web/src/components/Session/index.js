import { Fragment, useEffect, useState, useReducer } from 'react';

// Modules
import Chess from 'chess-engine';

// Components
import Game from '../Game';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  background-color: #FAFAFA;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const matchController = Chess.startSession();
const initialMatchId = matchController.newMatch();

function matchReducer(state, action) {
  switch(action) {
    case 'controller': 
      return {
        ...state,
        
      }
  }
}

const Session = () => {

  // Make this into useReducer instead of useState
  const [match, setMatch] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [matchController, setMatchController] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);

  // Initial Match Load
  useEffect(() => {
      Chess.setMatchObserver(setMatch, initialMatchId);
  }, []);

  useEffect(() => {
    if (match) {
      setMatchData(match.data);
      setMatchController(match.controller);
    };
  }, [match]);

  useEffect(() => {
    if (matchController && !gameStarted) {
      matchController.newGame();
      setGameStarted(true);
    }
  }, [matchController, gameStarted]);

  console.info(match)

  return (
    <Container>
      { matchData && matchController && (
        <Game gameId={matchData.currentGame} resign={matchController.resignGame}>
          { matchData.matchInfo && (
            <Fragment>
              <h1>Side: {matchData.matchInfo.currentSide}</h1>
              <h5>You: {matchData.matchInfo.wins.player}   Computer: {matchData.matchInfo.wins.opponent}</h5>
              <h4>{matchData.matchInfo.games}</h4>
            </Fragment>
          )}
        </Game>
      )}
    </Container>
  )
};

export default Session;
