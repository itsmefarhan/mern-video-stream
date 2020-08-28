import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/user/userContext";
import { AuthContext } from "../context/auth/authContext";

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

const EditProfile = (props) => {
  const classes = useStyles();

  const { message, updateUser } = useContext(UserContext);
  const { loggedInUser, isAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState({
    name: loggedInUser !== null ? loggedInUser.name : "",
    email: loggedInUser !== null ? loggedInUser.email : "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }

    if (message !== null) {
      setOpen(true);
    }
  }, [message, loggedInUser]);

  const { name, email } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateUser(props.match.params.id, { name, email });
  };

  // On modal close
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container>
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={8}>
          <Typography variant="h3" align="center" color="textSecondary">
            Edit Profile
          </Typography>
          <Paper elevation={10} className={classes.paper}>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input name="name" value={name} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" value={email} onChange={handleChange} />
            </FormControl>

            <div className={classes.btn}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={4} xs={2} />
      </Grid>
      {open ? (
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="simple-dialog-title">
            <Typography variant="body1" align="center">
              Account successfully updated
            </Typography>
          </DialogTitle>
        </Dialog>
      ) : null}
    </>
  );
};

export default EditProfile;
