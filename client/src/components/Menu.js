import React, { useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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

const Menu = () => {
  const classes = useStyles();
  const { loadUser, isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">MERN Boilerplate</Typography>
          </Link>
          <Link to="/users" className={classes.links}>
            Users
          </Link>
          {isAuthenticated ? (
            <Link to="#!" className={classes.links} onClick={logout}>
              Logout
            </Link>
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

export default Menu;
