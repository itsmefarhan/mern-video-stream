import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/auth/authContext";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    marginTop: "20px",
  },
  form: {
    marginTop: "10px",
  },
  btn: {
    marginTop: "20px",
    textAlign: "center",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const { login, isAuthenticated, error, message } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error !== null) {
      setErrorMsg(error);
    }
    if (message !== null) {
      setUser({
        email: "",
        password: "",
      });
    }
  }, [error, message, isAuthenticated, props.history]);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrorMsg(null);

    login({ email, password });
  };

  return (
    <>
      <Grid container>
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={8}>
          <Typography variant="h3" align="center" color="textSecondary">
            Login
          </Typography>
          <Paper elevation={10} className={classes.paper}>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" value={email} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </FormControl>
            {errorMsg !== null ? (
              <Typography variant="caption" color="error">
                {errorMsg}
              </Typography>
            ) : null}
            <div className={classes.btn}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={4} xs={2} />
      </Grid>
    </>
  );
};

export default Login;
