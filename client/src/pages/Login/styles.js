import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Login: {
    paddingTop: theme.spacing(8),
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  FormContainer: {
    padding: "3rem 4rem",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    maxWidth: "500px",
    width: "100%",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TextField: {
    fontFamily: theme.fontFamily,
    margin: "1rem 0",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  Button: {
    margin: "1.5rem 0 1rem 0",
    padding: "12px 48px",
    fontSize: "1rem",
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
