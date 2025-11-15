import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  NavBar: {
    width: "100%",
    height: "100%",
    background: theme.white,
  },
  NavBarWrap: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Brand: {
    textTransform: "uppercase",
    letterSpacing: "0.6rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    "& a": {
      textDecoration: "none",
      color: "transparent",
      background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  Scoreboard: {
    display: "flex",
    alignItems: "center",
  },
  BlueScore: (props) => ({
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: props.currentTurn === "blue" ? theme.white : theme.blue.medium,
    background: props.currentTurn === "blue" ? theme.blue.medium : "none",
    borderRadius: "5px",
    "& h3": {
      margin: "0.5rem",
      fontSize: "1.5rem",
    },
  }),
  RedScore: (props) => ({
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: props.currentTurn === "red" ? theme.white : theme.red.medium,
    background: props.currentTurn === "red" ? theme.red.medium : "none",
    borderRadius: "5px",
    "& h3": {
      margin: "0.5rem",
      fontSize: "1.5rem",
    },
  }),
  BlueTeam: {
    color: theme.blue.medium,
    marginRight: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  RedTeam: {
    color: theme.red.medium,
    marginLeft: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  SpyMasterText: {
    fontWeight: 900,
  },
  BarControls: {
    display: "flex",
    alignItems: "center",
  },
  NewGameButton: {
    marginRight: "2rem",
  },
  EndGameButton: {
    marginRight: "2rem",
    backgroundColor: theme.red.medium,
    color: theme.white,
  },
  Profile: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
