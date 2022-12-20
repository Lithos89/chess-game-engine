import { startSession } from 'chess-engine';

import Game from '../Game';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  background-color: #FAFAFA;
  height: 100vh;
`;

const matchController = Chess.startSession();
const initialMatch = matchController.newMatch();

const Session = () => {
  const { matchController, showcase } = startSession();

  const [matchInfo, setMatchInfo] = useState(null);
  const [match, setMatch] = useState(initialMatch);

  const [matchLoaded, setMatchLoaded] = useState(false);


  console.log(squares)

  return (
    <Container>
      { matchLoaded && (
        <Game game={match.currentGame} resign={match.resignGame}>
          { matchInfo && (
            <Fragment>
              <h1>Side: {matchInfo.currentSide}</h1>
              <h5>You: {matchInfo.wins.player}   Computer: {matchInfo.wins.opponent}</h5>
              <h4>{matchInfo.games}</h4>
            </Fragment>
          )}
        </Game>
      )}
    </Container>
  )
};

export default Session;