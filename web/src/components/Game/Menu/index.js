
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
  background-color: #ccc;

  @media ${devices.tablet} {
    min-width: 300px;
    flex: 1 2 300px;
    padding: 20px;
    min-height: 0;
  }
`;

const Menu = ({ undo, resign, moveLog, captures, next, children }) => {
  const isLaptop = useMediaQuery(devices.laptop);

  return(
    <MenuContainer>
      {/* Controllers */}
      {children}
      <MoveHistory moveLog={moveLog} />
      {captures && isLaptop && (
        <Fragment>
          <h3>
            Captures
          </h3>
          <CapturesDisplay captures={captures.white} side="black"/>
          <CapturesDisplay captures={captures.black} side="white"/>
        </Fragment>
      )}
      <Button onClick={undo}> Undo </Button>
      <Button onClick={resign}> Resign </Button>
      { next && (
        <Button onClick={next}> Start Next </Button>
      )}
    </MenuContainer>
  );
};

export default Menu;
