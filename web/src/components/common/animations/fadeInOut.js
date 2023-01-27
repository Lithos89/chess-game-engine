import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
    transform: translate(-1%, 0);
  }
  to { 
    opacity: 1;
    /* display: block; */
    top: 0px;
  }
`;

// const fadeInOut = styled`
//   animation-name: ${fadeIn};
//   animation-duration: 2s;

//   :hidden {
//     visibility: hidden;
//     opacity: 0;
//   }
// `;

export default fadeIn;