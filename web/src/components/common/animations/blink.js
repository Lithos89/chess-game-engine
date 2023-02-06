
// Styling
import { keyframes } from "styled-components";

const blink = keyframes`
  0% { opacity: 1 }
  /* 50% { opacity: 0} */
  100% { opacity: 0; }
`;

export default blink;