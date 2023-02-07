
import { useEffect, useState } from 'react';
import Chess from 'chess-engine';

// Components
import Match from '../Match';
import ModeSelector from './ModeSelector';

// Styling
import styled from 'styled-components';
import { devices } from 'config/devices';

const Container = styled.div`
  display: flex;
  position: relative;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;

  align-items: stretch;
  justify-content: center;
  
  // TODO: Make sure to change this to a gradient or a background picture
  
  /* background: linear-gradient(${p => p.theme.color.green.light}, ${p => p.theme.color.green.dark}); */
  background-color: ${p => p.theme.color.white.main};

  @media ${devices.tablet} {
    align-items: stretch;
  };
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
