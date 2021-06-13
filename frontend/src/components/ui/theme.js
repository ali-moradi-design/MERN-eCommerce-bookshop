import { createMuiTheme } from '@material-ui/core/styles';
const arcRed = '#8f1946';
const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';
const white = '#fff';

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      red: arcRed,
      orange: arcOrange,
      gray: arcGrey,
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
      fontFamily: 'Dosis',
      // textTransform: 'none',
      fontWeight: 700,
      color: 'white',
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'Dosis',
      fontSize: '1rem',
      textTransform: 'none',
      color: arcRed,
    },
    h1: {
      fontFamily: 'Dosis',
      fontWeight: 700,
      fontSize: '3rem',
      color: '#000',
      lineHeight: 1.5,
      padding: '1rem 0',
    },
    h2: {
      fontFamily: 'Dosis',
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#000',
      lineHeight: 1.5,
    },
    h3: {
      fontWeight: 500,
      fontFamily: 'Dosis',
      fontSize: '2rem',
      color: white,
    },
    h4: {
      fontFamily: 'Dosis',
      fontSize: '1.75rem',
      color: '#000',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'Dosis',
      fontWeight: 300,
      fontSize: '1.6rem',
      color: '#000',
      lineHeight: 1,
    },
    h6: {
      fontFamily: 'Dosis',
      fontWeight: 400,
      fontSize: '1.6rem',
      color: white,
      lineHeight: 1,
    },
    subtitle1: {
      fontFamily: 'Dosis',
      fontSize: '1.25rem',
      fontWeight: 300,
      color: white,
    },
    subtitle2: {
      fontFamily: 'Dosis',
      color: 'white',
      fontWeight: 300,
      fontSize: '1.25rem',
    },
    body1: {
      fontFamily: 'Dosis',
      fontSize: '1.25rem',
      color: arcGrey,
      fontWeight: 400,
    },
    caption: {
      fontFamily: 'Dosis',
      fontSize: '1rem',
      fontWeight: 300,
      color: arcGrey,
    },
    learnButton: {
      borderColor: arcBlue,
      borderWidth: 2,
      textTransform: 'none',
      color: arcBlue,
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: arcOrange,
        fontSize: '1rem',
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: 0,
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${arcOrange}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${arcOrange}`,
        },
      },
    },
  },
});
