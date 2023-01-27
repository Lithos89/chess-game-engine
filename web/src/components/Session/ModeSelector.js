
import { useState } from 'react';

// Styling
import styled from "styled-components";
import Overlay from "components/common/styled/Overlay";
import Button from "components/common/styled/Button";
import FlexContainer from 'components/common/styled/FlexContainer';

// Animations
import fadeOut from "../common/animations/fadeOut";

const SideBox = styled(Button)`
  padding: 20px;
  background-color: ${(p) => p.side};
  border: black solid ${(p) => p.active ? '6px' : '2px'};
  border-radius: 5%;
`;

const StyledRadioButton = styled(Button)`
  border: black solid ${(p) => p.active ? '4px' : '2px'};
`;

const SubmitBtn = styled(Button)`
  padding: 20px 60px;
  /* border-radius: 5%; */
  /* background-color: red; */
`;

const FadingBtn = styled(SubmitBtn)`
  :target {
    animation-name: ${fadeOut};
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
`;



const ModeSelector = ({ selector }) => {
  const [mode, setMode] = useState("computer");
  const [side, setSide] = useState("white");
  const [shouldFade, setShouldFade] = useState(false);
  const [faded, setFaded] = useState(false);

  return (
    <Overlay fade={shouldFade}>
      <FlexContainer>
        <StyledRadioButton active={mode === "computer"} onClick={() => setMode("computer")}>Computer</StyledRadioButton>
        <StyledRadioButton active={mode === "local"} onClick={() => setMode("local")}>Local</StyledRadioButton>
      </FlexContainer>

      {mode === "computer" && (
        <FlexContainer>
          <SideBox active={side === "white"} onClick={() => setSide("white")} side="white" />
          <SideBox active={side === "random"} onClick={() => setSide("random")} side="red" />
          <SideBox active={side === "black"} onClick={() => setSide("black")} side="black" />
        </FlexContainer>
      )}
      
      <FadingBtn onClick={() => { setShouldFade(true); selector({ mode, side });}}>Start</FadingBtn>
    </Overlay>
  )
};

export default ModeSelector;
