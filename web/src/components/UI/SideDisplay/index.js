
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
  background-color: ${ p => p.side === "white" ?
    p.theme.color.white.solid :
    p.theme.color.black.solid
  };
  color: ${ p => p.side === "white" ?
    p.theme.color.black.solid :
    p.theme.color.white.solid
  };

  flex: 1 1;
  /* height: 100%; */
  /* max-height: 4vh;

  @media ${devices.tablet} {
    max-height: 8vh;
  }; */

  /* grid-template-columns: repeat(5, 1fr);

  grid-template-rows: repeat(2, 1fr); */

  /* height: 100%; */

  justify-content: start;
`;

const Indicator = styled.div`
  align-self: center;
  width: 4rem;
  display: inline-block;
  justify-self: start;
  /* flex: 0; */
  height: 100%;
  aspect-ratio: 1 / 1;
  /* grid-column: 1 / span 1;
  grid-row: 1 / span 2; */
  /* display: inline-block; */
  background-color: ${p => p.active ? "green" : "white" };
  border-radius: 50%;
`;

const NameDisplay = styled.h3`
  text-align: start;
`;

const TempContainer = styled.div`
  /* flex: 1; */
  
  display: flex;
  flex-direction: column;
`;

const SideDisplay = ({ side, active, name, captures, wins }) => {

  const isLaptop = useMediaQuery(devices.laptop);

  return (
    <Container side={side}>
      <Indicator active={active} />
      {wins ?? '0.0'}
      <TempContainer>
        <NameDisplay>
          {name}
        </NameDisplay>
        {captures && !isLaptop &&
          <CapturesDisplay captures={captures} side={side === "white" ? "black" : "white"} /> 
        }
      </TempContainer>
    </Container>
  );
};

export default SideDisplay;
