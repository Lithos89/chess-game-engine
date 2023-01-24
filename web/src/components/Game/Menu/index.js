
import styled from 'styled-components';
import CapturesDisplay from './CapturesDisplay';
import MoveHistory from './MoveHistory';

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
      <button onClick={undo}> Undo </button>
      <button onClick={resign}> Resign </button>
      { next && (
        <button onClick={next}> Start Next </button>
      )}
    </MenuContainer>
  );
};

export default Menu;
