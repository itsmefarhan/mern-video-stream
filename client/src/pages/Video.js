import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";
import { UserContext } from "../context/user/userContext";

const useStyles = makeStyles(() => ({
  sideGrid: {
    display: "flex",
    marginTop: "10px",
  },
  sideDiv: {
    marginLeft: "20px",
  },
}));

const Video = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const { sub, unsub, user, getUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`/api/media/${id}`)
      .then((res) => {
        setVideo(res.data);
        getUser(res.data.postedBy && res.data.postedBy._id);
      })

      .catch((e) => console.log(e));
  }, [id, user && user.count]);

  useEffect(() => {
    axios
      .get(`/api/media/related/${id}`)
      .then((res) => setVideos(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        {/* Video Section */}
        <Grid item xs={12} sm={8}>
          <ReactPlayer
            url={`/${video.filePath}`}
            controls
            width="100%"
            height="auto"
          />
          <List>
            <ListItem>
              <ListItemText
                primary={video.title}
                secondary={`${video.views} views - ${new Date(
                  video.createdAt
                ).toDateString()}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar />
              <ListItemText
                primary={video.postedBy && video.postedBy.name}
                secondary={`${
                  user && user.subscriber && user.subscriber.length
                } subscribers`}
              />
              {loggedInUser &&
                video.postedBy &&
                loggedInUser._id !== video.postedBy._id && (
                  <ListItemSecondaryAction>
                    {user &&
                    user.subscriber &&
                    user.subscriber.includes(loggedInUser._id) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          unsub(
                            loggedInUser && loggedInUser._id,
                            video.postedBy && video.postedBy._id
                          )
                        }
                      >
                        SUBSCRIBED
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          sub(
                            loggedInUser && loggedInUser._id,
                            video.postedBy && video.postedBy._id
                          )
                        }
                      >
                        SUBSCRIBE
                      </Button>
                    )}
                  </ListItemSecondaryAction>
                )}
            </ListItem>
          </List>
        </Grid>
        {/* Related Videos */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" color="textSecondary">
            RELATED VIDEOS
          </Typography>
          {videos.map((vid) => (
            <Paper className={classes.sideGrid} elevation={3} key={vid._id}>
              <Link to={`/video/${vid._id}`}>
                <ReactPlayer
                  url={`/${vid.filePath}`}
                  width={200}
                  height="auto"
                />
              </Link>
              <div className={classes.sideDiv}>
                <Typography variant="h6">{vid.title}</Typography>
                <Typography variant="body1">
                  {vid.postedBy && vid.postedBy.name}
                </Typography>
                <Typography variant="caption">{vid.views} views</Typography>
              </div>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Video;
