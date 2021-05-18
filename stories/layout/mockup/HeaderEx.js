import React from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";
import MoreVert from "@material-ui/icons/MoreVert";
import Favorite from "@material-ui/icons/Favorite";
import Phone from "@material-ui/icons/Phone";
import Camera from "@material-ui/icons/Camera";

const styles = ({
  direction,
  spacing,
  transitions,
  breakpoints,
  palette,
  shape,
}) => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    marginRight: 8,
    borderRadius: shape.borderRadius,
    background:
      palette.type === "dark" ? palette.background.default : palette.grey[200],
    "&:hover": {
      background:
        palette.type === "dark" ? palette.background.paper : palette.grey[300],
    },
    marginLeft: 0,
    width: "100%",
    [breakpoints.up("sm")]: {
      marginLeft: spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    borderRadius: 4,
    paddingTop: spacing(1),
    paddingRight: spacing(direction === "rtl" ? 10 : 1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(direction === "rtl" ? 1 : 10),
    transition: transitions.create("width"),
    width: "100%",
    [breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});

const HeaderEx = ({ classes, screen }) => {
  const theme = useTheme();
  return (
    <>
      <Typography noWrap color={"textSecondary"} className={classes.header}>
        Layout v3.1
      </Typography>
      <div className={classes.grow} />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
      {screen === "xs" && (
        <IconButton>
          <MoreVert />
        </IconButton>
      )}
      {screen === "sm" && (
        <>
          <IconButton>
            <Favorite />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </>
      )}
      {screen && screen !== "xs" && screen !== "sm" && (
        <>
          <IconButton>
            <Favorite />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <Camera />
          </IconButton>
        </>
      )}
    </>
  );
};

HeaderEx.propTypes = {
  screen: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};
HeaderEx.defaultProps = {
  screen: null,
};

export default withStyles(styles)(HeaderEx);
