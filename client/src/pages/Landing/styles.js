import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Landing: {
    paddingTop: theme.spacing(8),
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  Card: {
    padding: "3rem",
    textAlign: "center",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
  },
  Heading: {
    marginBottom: "2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "3rem",
  },
  Button: {
    margin: "0 1rem",
    padding: "12px 32px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 600,
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    },
  },
}));

export default useStyles;
