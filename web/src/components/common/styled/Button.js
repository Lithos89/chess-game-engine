
// Styling
import styled from "styled-components";

// Animations
import buttonClick from "../animations/buttonClick";

const StyledBtn = styled.button`
  border-radius: 5%;
  /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
  padding: 1em;

  :hover {
    cursor: pointer;
  };

  :active {
    animation-name: ${buttonClick};
    animation-duration: 0.2s;
  }
`;

export default StyledBtn;
