
// Styling
import styled, { css } from "styled-components";

const SideBox = styled.div`
  /* display: inline-block; */
  width: 60px;
  height: 60px;
  background-color: ${(p) => p.side === "random" ? "red" :p.theme.colors[p.side].main};
  ${p => p.bordered && css`
    border: ${p => p.theme.colors.black.main} solid 2px;
  `};
  border-radius: 5%;
`;

const SplitSideBox = styled.div`
  display: flex;
  border-radius: 5%;
  justify-content: center;

  width: 60px;
  height: 60px;
  overflow: hidden;

  border: ${p => p.theme.colors.black.main} solid 2px;

  & > * {
    flex: 1;
    border-radius: 0%;
  };
`;

const TempSideBox = ({ side }) => {
  if (side === "random") {
    return (
      <SplitSideBox className="highlight">
        <SideBox side="white" />
        <SideBox side="black" />
      </SplitSideBox>
    );
  } else {
    return <SideBox bordered className="highlight" side={side} />
  }
}

export default TempSideBox;
