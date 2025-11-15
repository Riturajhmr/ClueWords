import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  NavBar: {
    width: "100%",
    height: "12vh",
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
  ProfileItem: {
    margin: "0 .5rem",
  },
  Profile: {
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
