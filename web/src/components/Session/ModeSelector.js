
import { Fragment, useState } from 'react';

// Styling
import styled, { css } from "styled-components";
import Overlay from "components/common/styled/Overlay";
import Button from "components/common/styled/Button";
import SideBox from "components/common/styled/SideBox";

// Animations
import fadeOut from "../common/animations/fadeOut";
import RadioButtonGroup from "../common/RadioButtonGroup";

// Data
import pieceAssets from 'data/piece-assets.json';

const SubmitBtn = styled(Button)`
  width: 100%;
  font-size: large;
  /* border-radius: 5%; */
  /* background-color: red; */
`;

const FadingBtn = styled(SubmitBtn)`
  :target {
    animation-name: ${fadeOut};
    animation-duration: 1s;
    animation-fill-mode: forwards;
  };
`;

const ModeSelection = styled.div`
  /* padding: 20px 60px; */
`;

const ModeSelector = ({ selector }) => {
  const [mode, setMode] = useState("computer");
  const [side, setSide] = useState("white");
  const [shouldFade, setShouldFade] = useState(false);

  const computerIsSelected = mode === "computer";

  return (
    <Overlay fade={shouldFade}>
      <Fragment>
        <h3>Select an opponent</h3>

        <br />

        <RadioButtonGroup
            name="mode"
            def={mode}
            selector={setMode}
            valueProp="mode"
          >
            <ModeSelection className='highlight' mode="computer">
              <img src={pieceAssets['queen_black']} draggable={true} />
            </ModeSelection>
            <ModeSelection className='highlight' mode="local">
              <img src={pieceAssets['king_black']} draggable={true} />
            </ModeSelection>
        </RadioButtonGroup>
      </Fragment>

      {computerIsSelected && (
        <Fragment>
          <h3>Select a side</h3>
          <br />
          
          <RadioButtonGroup
            name="side"
            def={side}
            selector={setSide}
            valueProp="side"
            css={
              css`
                align-items: center;
              `
            }
          >
            <SideBox side="white" />
            <SideBox side="random" />
            <SideBox side="black" />
          </RadioButtonGroup>
        </Fragment>
      )}

      <FadingBtn onClick={() => { setShouldFade(true); selector({ mode, side });}}>Start</FadingBtn>
    </Overlay>
  )
};

export default ModeSelector;
