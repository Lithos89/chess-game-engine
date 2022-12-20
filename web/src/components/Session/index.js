import { startSession } from 'chess-engine';

import Game from '../Game';

<<<<<<< Updated upstream
=======
// Styling
import styled from 'styled-components';

const Container = styled.div`
  background-color: #FAFAFA;
  height: 100vh;
`;

const matchController = Chess.startSession();
const initialMatch = matchController.newMatch();

>>>>>>> Stashed changes
const Session = () => {
  const { matchController, showcase } = startSession();

<<<<<<< Updated upstream
  const squares = matchController.start();
=======
  const [matchInfo, setMatchInfo] = useState(null);
  const [match, setMatch] = useState(initialMatch);

  const [matchLoaded, setMatchLoaded] = useState(false);

>>>>>>> Stashed changes

  console.log(squares)

  return (
<<<<<<< Updated upstream
    <Game resetFunc={matchController.reset} newSquares={squares} showcase={showcase} />
=======
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
>>>>>>> Stashed changes
  )
};

export default Session;