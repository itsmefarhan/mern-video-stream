import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/user/userContext";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    width: "70%",
    padding: "20px",
  },
  link: {
    textDecoration: "none",
  },
}));

const Users = () => {
  const classes = useStyles();
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.paper} elevation={5}>
      {users && !users.length ? (
        <Typography variant="body1" align="center">
          No users found
        </Typography>
      ) : (
        <>
          <Typography variant="h6">All Users</Typography>
          <Divider />
          <List>
            {users &&
              users.map((user) => (
                <Link
                  key={user._id}
                  to={`/user/${user._id}`}
                  className={classes.link}
                >
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default Users;
