import { Fragment, useEffect, useState } from 'react';

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
const initialMatch = matchController.newMatch();

const Session = () => {

  const [matchData, setMatchData] = useState(null);

  // Initial Match Load
  useEffect(() => {
      initialMatch.startNewGame();
      Chess.setMatchObserver(setMatchData, 'test')
      // Chess.setMatchObserver(setMatchInfo, match);
  }, []);

  console.info(matchData);

  return (
    <Container>
      { matchData && (
        <Game game={matchData.currentGame} resign={matchData.resignGame}>
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
