
// Styling
import styled, { css } from "styled-components";
import FlexContainer from "./FlexContainer";

// Animations
import fadeIn from "../animations/fadeInOut";
import fadeOut from "../animations/fadeOut";

const Container = styled.div`
  position: absolute;

  left: 50%;
  transform: translate(-50%, 0);

  margin: auto;

  height: ${(p) => p.width};
  width: ${(p) => p.height};
  padding: 20px;

  background-color: white;
  border: solid black 3px;
`;

const FadingContainer = styled(Container)`
  /* animation-name: ${fadeIn};
  animation-duration: 1s; */

  ${p => p.fade && css`
    animation-name: ${fadeOut};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  `}
`;

const Overlay = ({ height, width, children, fade }) => (
  <FadingContainer height={height} width={width} fade={fade}>
    <FlexContainer direction="column">
      {children}
    </FlexContainer>
  </FadingContainer>
);

export default Overlay;
