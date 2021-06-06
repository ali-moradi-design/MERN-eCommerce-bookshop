import { createMuiTheme } from "@material-ui/core/styles";
const arcRed = "#8f1946";
const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";
const white = "#fff";

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      red: arcRed,
      orange: arcOrange,
    },
    primary: {
      main: arcRed,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: arcBlue,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: "2.5rem",
      color: white,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: "#000",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      color: "#000",
      lineHeight: 1,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.6rem",
      color: white,
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: white,
    },
    subtitle2: {
      color: "white",
      fontWeight: 300,
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGrey,
      fontWeight: 300,
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGrey,
    },
    learnButton: {
      borderColor: arcBlue,
      borderWidth: 2,
      textTransform: "none",
      color: arcBlue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 300,
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
  },
});
