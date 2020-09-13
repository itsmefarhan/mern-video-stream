import React, { useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
  },
  links: {
    textDecoration: "none",
    color: "white",
    marginLeft: theme.spacing(2),
  },
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
  },
}));

const Menu = (props) => {
  const classes = useStyles();
  const { loadUser, isAuthenticated, logout, loggedInUser } = useContext(AuthContext);
  
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    props.history.push("/");
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">Let's Watch</Typography>
          </Link>
          <Link to="/users" className={classes.links}>
            Users
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={`/user/${loggedInUser._id}`} className={classes.links}>
                Profile
              </Link>
              <Link to={`/upload`} className={classes.links}>
                Upload
              </Link>
              <Link to="#!" className={classes.links} onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className={classes.links}>
                Register
              </Link>
              <Link to="/login" className={classes.links}>
                Login
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </>
  );
};

export default withRouter(Menu);
