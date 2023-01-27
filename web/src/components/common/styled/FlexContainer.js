
// Styling
import styled from "styled-components";

// Animations
import fadeOut from "../animations/fadeOut";

const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => p.direction ?? "row"};
  gap: 10px;
  
  align-content: center;
  align-items: center;

  height: ${(p) => p.width ?? "auto"};
  width: ${(p) => p.height ?? "auto"};

  > * {
    flex: 1;
  }


  /* animation-name: ${fadeOut};
  animation-duration: 1s; */
`;

const FlexContainer = ({
  direction,
  children,
  height,
  width
}) => {
  return (
    <Container direction={direction} height={height} width={width}>
      {children}
    </Container>
  );
};

export default FlexContainer;
