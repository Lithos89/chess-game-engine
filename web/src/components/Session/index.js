import { Fragment, useEffect, useState} from 'react';

// Modules
import { startSession, setMatchObserver } from 'chess-engine';

// Components
import Game from '../Game';

const session = startSession();
const initialMatch = session.newMatch();

const Session = () => {

  const [matchInfo, setMatchInfo] = useState(null);


  // TODO: Move the movement Function into a custom hook
  const [match, setMatch] = useState(initialMatch);

  const [matchLoaded, setMatchLoaded] = useState(false);

  // Initial Match Load
  useEffect(() => {
      match.startNewGame();
      setMatchObserver(setMatchInfo);
      setMatchLoaded(true);
  }, []);

  return (
    <Fragment>
      { matchLoaded && (
        <Fragment>
          <Game game={match.currentGame}/>
          <button onClick={() => {match.resignGame()}}> Resign </button>
        </Fragment>
      )}
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
