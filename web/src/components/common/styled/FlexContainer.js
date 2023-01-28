
// Styling
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  flex-direction: ${(p) => p.direction ?? "row"};
  gap: 10px;
  
  align-content: center;
  align-items: center;

  height: ${(p) => p.width ?? "auto"};
  width: ${(p) => p.height ?? "auto"};

  list-style: none;
`;

const Item = styled.li`
  flex: 1;
`;

const FlexContainer = ({ direction, children, height, width }) => {
  return (
    <Container direction={direction} height={height} width={width}>
      {
        children.map((child, i) => (
          <Item key={i}>
            {child}
          </Item>
        ))
      }
    </Container>
  );
};

export default FlexContainer;
