
import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    gold: "#FFD700",

    black: {
      solid: "#000000",
      main: "#0E1116",
      temp: "#3B3936",
    },

    white: {
      solid: "#FFFFFF",
      main: "#F3F3F3",
    },
    
    wood: {
      dark: "#8B5E3C",
      light: "#D7D6D6",
    },
    gray: {
      dark: "#393E41",
      light: "#D9D9D9",
      composite: "#DDDDDD",
    },
    green: {
      light: "#889C9B",
      dark: "#486966",
    }
  },
  font: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
