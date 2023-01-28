
import { Fragment, useState } from 'react';

// Styling
import styled from "styled-components";
import Overlay from "components/common/styled/Overlay";
import Button from "components/common/styled/Button";
import SideBox from "components/common/styled/SideBox";

// Animations
import fadeOut from "../common/animations/fadeOut";
import RadioButtonGroup from "../common/RadioButtonGroup";

// Data
import pieceAssets from 'data/piece-assets.json';

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

        <RadioButtonGroup
            name="mode"
            def={mode}
            selector={setMode}
            valueProp="mode"
          >
            <ModeSelection className='highlight' mode="computer">
              <img src={pieceAssets['king_black']} draggable={true} />
            </ModeSelection>
            <ModeSelection className='highlight' mode="local">
              <img src={pieceAssets['king_black']} draggable={true} />
            </ModeSelection>
        </RadioButtonGroup>
      </Fragment>

      {computerIsSelected && (
        <Fragment>
          <h3>Select a side</h3>
          
          <RadioButtonGroup
            name="side"
            def={side}
            selector={setSide}
            valueProp="side"
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
