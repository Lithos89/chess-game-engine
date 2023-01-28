
// Styling
import styled from "styled-components";

const SideBox = styled.div`
  /* display: inline-block; */
  padding: 30px;
  background-color: ${(p) => p.side === "random" ? "red" : p.side};
  border: black solid 2px;
  border-radius: 5%;
`;

const TempSideBox = ({ side }) => {
  return <SideBox className="highlight" side={side} />
}

export default TempSideBox;
