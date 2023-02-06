
// Styling & Animations
import styled from "styled-components";
import { devices } from "config/devices";
import blink from "components/common/animations/blink";

const Container = styled.div`
  width: 2rem;
  align-self: center;
`;

const Indicator = styled.div`
aspect-ratio: 1 / 1;
border-radius: 50%;

align-self: center;
justify-self: start;

background-color: green;

animation-name: ${blink};
animation-timing-function: ease-in;
animation-iteration-count: infinite;
animation-duration: 2s;
animation-direction: alternate;
`;

const TurnIndicator = ({ active }) => {
  return (
    <Container>
      {active && <Indicator />}
    </Container>
  )
}

export default TurnIndicator;
