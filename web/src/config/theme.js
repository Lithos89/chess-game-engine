
import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    gold: "#FFD700",

    black: {
      solid: "#000000",
      main: "#0E1116",
    },

    white: {
      solid: "#FFFFFF",
      main: "#FBFEF9",
    },
    
    wood: {
      dark: "#8B5E3C",
      light: "#FDf5E6",
    },
    gray: {
      dark: "#4F4F4F",
      light: "#D9D9D9",
    },
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
