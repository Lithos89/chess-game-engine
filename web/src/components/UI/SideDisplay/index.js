
// Components
import CapturesDisplay from "components/Game/Menu/CapturesDisplay";

// Styling
import styled from "styled-components";
import { devices } from "config/devices";

// Hooks
import useMediaQuery from "hooks/useMediaQuery";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;

  padding: 0.2rem 1rem;

  background-color: ${ p => p.side === "white" ?
    p.theme.color.white.solid :
    p.theme.color.black.solid
  };
  color: ${ p => p.side === "white" ?
    p.theme.color.black.solid :
    p.theme.color.white.solid
  };
`;

const Indicator = styled.div`
  display: inline-block;
  width: 2rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  align-self: center;
  justify-self: start;

  background-color: ${p => p.active ? "green" : "white" };
`;

const NameDisplay = styled.h3`
  text-align: start;
`;

const TempContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;
`;

const WinCounter = styled.div`
  margin: auto 1rem;
  padding: 0.25rem;

  font-size: 1rem;
  font-weight: bold;

  border: solid ${p => p.theme.color.gray.dark} 1px;
  border-radius: 5%;
  background-color: ${p => p.theme.color.gray.light};
  
  color: ${p => p.theme.color.black.main};

  @media ${devices.tablet} {
    padding: 0.5rem;
  };
`;

const SideDisplay = ({ side, active, name, captures, wins }) => {
  const isLaptop = useMediaQuery(devices.laptop);
  const score = wins?.toFixed(1) ?? "0.0";

  return (
    <Container side={side}>
      <Indicator active={active} />
        <WinCounter>
          {score}
        </WinCounter>
      <TempContainer>
        <NameDisplay>
          {name}
        </NameDisplay>
        {!isLaptop &&
          <CapturesDisplay captures={captures} side={side === "white" ? "black" : "white"} /> 
        }
      </TempContainer>
    </Container>
  );
};

export default SideDisplay;
