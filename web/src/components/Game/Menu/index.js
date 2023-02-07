
import { Fragment } from "react";

// Components
import CapturesDisplay from './CapturesDisplay';
import MoveHistory from './MoveHistory';

// Styling
import styled from 'styled-components';
import Button from "../../common/styled/Button";
import { devices } from 'config/devices';

// Hooks
import useMediaQuery from "hooks/useMediaQuery";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  background-color: ${p => p.theme.color.wood.light};

  @media ${devices.tablet} {
    min-width: 300px;
    flex: 1 2 300px;
    padding: 20px;
    min-height: 0;
  }
`;

const CapturesContainer = styled.div`
  margin: 1rem 0;

  @media ${devices.tablet} {
    margin-bottom: 0.5rem 0;
  };
`;

const Menu = ({ undo, resign, moveLog, captures, next, children }) => {
  const isLaptop = useMediaQuery(devices.laptop);

  return(
    <MenuContainer>
      {/* Controllers */}
      {children}
      <MoveHistory moveLog={moveLog} />
      {captures && isLaptop && (
        <CapturesContainer>
          {/* <h3>
            Captures
          </h3> */}
          <CapturesDisplay captures={captures.white} side="black"/>
          <CapturesDisplay captures={captures.black} side="white"/>
        </CapturesContainer>
      )}
      {
        // TODO: Add back in when undo is functional in the engine
        /* <Button onClick={undo}> Undo </Button> */
      }
      <Button onClick={resign}> Resign </Button>
      { next && (
        <Button onClick={next}> Start Next </Button>
      )}
    </MenuContainer>
  );
};

export default Menu;
