
// Components
import CapturesDisplay from './CapturesDisplay';
import MoveHistory from './MoveHistory';

// Styling
import styled from 'styled-components';
import Button from "../../common/styled/Button";
import { devices } from 'config/devices';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3 2;
  background-color: #ccc;

  @media ${devices.tablet} {
    min-width: 300px;
    flex: 1 2 300px;
    padding: 20px;
    min-height: 0;
  }
`;

const Menu = ({ undo, resign, moveLog, captures, next, children }) => {
  return(
    <MenuContainer>
      {/* Controllers */}
      {children}
      <MoveHistory moveLog={moveLog} />
      {captures && <CapturesDisplay captures={captures}/>}
      <Button onClick={undo}> Undo </Button>
      <Button onClick={resign}> Resign </Button>
      { next && (
        <Button onClick={next}> Start Next </Button>
      )}
    </MenuContainer>
  );
};

export default Menu;
