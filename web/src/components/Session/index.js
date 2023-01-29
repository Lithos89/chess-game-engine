
import { useEffect, useState } from 'react';
import Chess from 'chess-engine';

// Components
import Match from '../Match';
import ModeSelector from './ModeSelector';

// Styling
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;

  min-height: 100vh;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  // TODO: Make sure to change this to a gradient or a background picture
  background-color: ${p => p.theme.colors.gray.dark};
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
      <ModeSelector selector={selectMode} />
      <Match matchId={matchId} mode={mode?.mode} />
    </Container>
  );
};

export default Session;
