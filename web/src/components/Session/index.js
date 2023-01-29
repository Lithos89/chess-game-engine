import { useEffect, useState } from 'react';

// Modules
import Chess from 'chess-engine';

// Components
import Match from '../Match';
import ModeSelector from './ModeSelector';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${p => p.theme.colors.gray.light};
  height: 100vh;
  display: flex;
  align-items: center;
`;

const matchController = Chess.startSession();

const Session = () => {
  const [mode, setMode] = useState(null);
  const [matchId, setMatchId] = useState(null);

  const selectMode = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    if (mode) {
      const matchId = matchController.newMatch(mode.mode, mode.side);
      setMatchId(matchId);
    };
  }, [mode]);

  return (
    <Container>
      {/* {!matchId && <ModeSelector selector={selectMode} /> } */}
      <ModeSelector selector={selectMode} />
      <Match matchId={matchId ?? null} mode={mode?.mode} />
    </Container>
  );
};

export default Session;
