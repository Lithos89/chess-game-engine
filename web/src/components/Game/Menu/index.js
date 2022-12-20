import styled from 'styled-components';
import MoveHistory from './MoveHistory';

const MenuContainer = styled.div`
  flex: 3;
  position: 'static';
  background-color: #ccc;
`;

const Menu = ({ undo, resign, children }) => {
  return(
    <MenuContainer>
      {/* Controllers */}
      {children}
      <MoveHistory />
      <button onClick={undo}> Undo </button>
      <button onClick={resign}> Resign </button>
    </MenuContainer>
  );
};

export default Menu;
