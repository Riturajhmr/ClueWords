import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Card: (props) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.white,
    cursor: props.clicked ? "default" : "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "12px",
    padding: "1.5rem",
    minHeight: "120px",
    boxShadow: props.clicked 
      ? "0 4px 6px rgba(0,0,0,0.1)" 
      : "0 2px 8px rgba(0,0,0,0.15)",
    "&:hover:not(.clicked)": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
    "&.clicked": {
      opacity: 0.8,
    },
  }),
  Red: (props) => ({
    color: props.isSpyMaster ? theme.red.medium : theme.grey.dark,
    "&.clicked": {
      background: `linear-gradient(45deg, ${theme.red.medium} 50%, ${theme.red.light} 85%)`,
      color: theme.white,
    },
  }),
  Blue: (props) => ({
    color: props.isSpyMaster ? theme.blue.medium : theme.grey.dark,
    "&.clicked": {
      background: `linear-gradient(45deg, ${theme.blue.medium} 50%, ${theme.blue.light} 85%)`,
      color: theme.white,
    },
  }),
  Innocent: (props) => ({
    color: props.isSpyMaster ? theme.grey.mediumDark : theme.grey.dark,
    "&.clicked": {
      background: theme.grey.medium,
      color: theme.grey.mediumDark,
    },
  }),
  Assassin: (props) => ({
    color: props.isSpyMaster ? "#8b0000" : theme.grey.dark,
    "&.clicked": {
      background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
      color: "#ff0000",
      fontWeight: 900,
    },
  }),
}));

export default useStyles;
