
// Styling
import styled, { css } from "styled-components";
import FlexContainer from "./FlexContainer";

// Animations
import fadeOut from "../animations/fadeOut";

const Backdrop = styled.div`
  display: flex;
  align-items: center;
  background: #000000AA;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${p => p.fade && css`
    animation-name: ${fadeOut};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  `}
`;

const Container = styled.aside`
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

const Overlay = ({ height, width, children, fade }) => (
  <Backdrop fade={fade}>
    <Container height={height} width={width}> 
      <FlexContainer direction="column">
        {children}
      </FlexContainer>
    </Container>
  </Backdrop>
);

export default Overlay;
