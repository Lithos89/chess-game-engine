
// Components
import CapturesDisplay from './CapturesDisplay';
import MoveHistory from './MoveHistory';

// Styling
import styled from 'styled-components';
import Button from "../../common/styled/Button";

const MenuContainer = styled.div`
  flex: 3;
  position: 'static';
  background-color: #ccc;
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
