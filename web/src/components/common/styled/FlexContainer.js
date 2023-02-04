
// Styling
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  flex-direction: ${(p) => p.direction ?? "row"};
  gap: 10px;

  height: ${(p) => p.width ?? "auto"};
  width: ${(p) => p.height ?? "auto"};

  list-style: none;
/* 
  justify-items: stretch;
  justify-content: stretch;
  align-content: stretch;
  align-items: stretch; */

  ${(p) => p.css ?? p.css}
`;

const Item = styled.li`
  flex: 1 1;
`;

const FlexContainer = ({ direction, children, height, width, css }) => {
  return (
    <Container direction={direction} height={height} width={width} css={css}>
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
