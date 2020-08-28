import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/userContext";
import { AuthContext } from "../context/auth/authContext";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  paper: {
    margin: "0 auto",
    width: "70%",
    padding: "20px",
  },
  link: {
    textDecoration: "none",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { user, getUser } = useContext(UserContext);
  const { loggedInUser, deleteUser } = useContext(AuthContext);

  const { id } = props.match.params;

  useEffect(() => {
    getUser(id);
  }, []);
  // console.log(state)

  const handleDelete = () => {
    let permission = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (permission) {
      deleteUser(loggedInUser._id);
      props.history.push("/login");
    }
  };
  return (
    user && (
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6">Profile</Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              {loggedInUser && user && loggedInUser._id === user._id && (
                <>
                  <Link to={`/user/edit/${user._id}`} className={classes.link}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>

                  <IconButton onClick={() => handleDelete()}>
                    <Delete color="error" />
                  </IconButton>
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Joined on ${new Date(user.createdAt).toDateString()}`}
            />
          </ListItem>
        </List>
      </Paper>
    )
  );
};

export default Profile;
