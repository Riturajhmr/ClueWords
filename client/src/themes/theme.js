import { createMuiTheme } from "@material-ui/core";

const colors = {
  red: {
    //Red Team + Logged in Users chat bubble
    light: "#e6918a",
    medium: "#f86255",
  },
  blue: {
    // Blue Team
    light: "#72b2ed",
    medium: "#3a98f1",
  },
  grey: {
    // Background
    superLight: "#f8f7f6",
    // for clicked clue button
    light: "#ebf1f8",
    // other users' chat bubbles
    medium: "#ebebeb",
    // innocent color text,
    mediumDark: "#bfbfbf",
    // "Send Invite" on new game + "Make Your Move"
    dark: "#5d5d5d",
  },
  // "Copy" Button for new game link
  white: "#ffffff",
  black: "#000000",
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      padding: 0,
      margin: 0,
    },
    h3: {
      fontSize: "1.1rem",
      fontWeight: 600,
      padding: 0,
      margin: 0,
    },
  },

  red: colors.red,
  blue: colors.blue,
  grey: colors.grey,
  white: colors.white,
  black: colors.black,
  palette: {
    primary: { 
      main: "#2563eb", 
      light: "#3b82f6",
      dark: "#1e40af",
      contrastText: "#fff" 
    },
    secondary: { 
      main: "#10b981", 
      light: "#34d399",
      dark: "#059669",
      contrastText: "#fff" 
    },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    info: { main: "#3b82f6" },
    success: { main: "#10b981" },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        padding: "8px 16px",
        fontWeight: 500,
      },
      contained: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }
      }
    },
    MuiCard: {
      root: {
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }
    },
    MuiTextField: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        }
      }
    }
  },
});
