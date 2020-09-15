import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
} from "@material-ui/core";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbDownOutlined from "@material-ui/icons/ThumbDownOutlined";
import ReactPlayer from "react-player";
import axios from "axios";
import { AuthContext } from "../context/auth/authContext";
import { UserContext } from "../context/user/userContext";
import Comment from "../components/Comment";
import RelatedVideos from "../components/RelatedVideos";

const Video = ({ match }) => {
  const { id } = match.params;
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);
  const [likeCount, setLikeCount] = useState();
  const [dislikeCount, setDislikeCount] = useState();
  const { loggedInUser } = useContext(AuthContext);
  const { sub, unsub, user, getUser } = useContext(UserContext);
  const [success, setSuccess] = useState(true);
  // Get video
  useEffect(() => {
    axios
      .get(`/api/media/${id}`)
      .then((res) => {
        setVideo(res.data);
        getUser(res.data.postedBy && res.data.postedBy._id);
      })

      .catch((e) => console.log(e));
  }, [id, user && user.count, success]);

  // Get related videos
  useEffect(() => {
    axios
      .get(`/api/media/related/${id}`)
      .then((res) => setVideos(res.data))
      .catch((e) => console.log(e));
  }, []);

  // Get likes / dislikes count
  useEffect(() => {
    axios
      .get(`/api/media/likedislike/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setLikeCount(res.data.likes);
        setDislikeCount(res.data.dislikes);
      });
  }, [success]);

  const handleLike = async (data) => {
    setSuccess(false);
    await axios.put(`/api/media/like/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSuccess(true);
  };

  const handleUnlike = async (data) => {
    setSuccess(false);
    await axios.put(`/api/media/unlike/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSuccess(true);
  };

  const handleDislike = async (data) => {
    setSuccess(false);
    await axios.put(`/api/media/dislike/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSuccess(true);
  };

  const handleUndislike = async (data) => {
    setSuccess(false);
    await axios.put(`/api/media/undislike/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSuccess(true);
  };

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
              {loggedInUser && (
                <ListItemSecondaryAction>
                  {likeCount}
                  {video &&
                  video.likes &&
                  video.likes.find(
                    (user) => user.postedBy === loggedInUser._id
                  ) ? (
                    <IconButton
                      onClick={() =>
                        handleUnlike({
                          postedBy: loggedInUser._id,
                          mediaId: id,
                        })
                      }
                    >
                      <ThumbUp />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleLike({ postedBy: loggedInUser._id, mediaId: id })
                      }
                    >
                      <ThumbUpOutlined />
                    </IconButton>
                  )}
                  {dislikeCount}
                  {video &&
                  video.dislikes &&
                  video.dislikes.find(
                    (user) => user.postedBy === loggedInUser._id
                  ) ? (
                    <IconButton
                      onClick={() =>
                        handleUndislike({
                          postedBy: loggedInUser._id,
                          mediaId: id,
                        })
                      }
                    >
                      <ThumbDown />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleDislike({
                          postedBy: loggedInUser._id,
                          mediaId: id,
                        })
                      }
                    >
                      <ThumbDownOutlined />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
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
          {/* Comments */}
          <Comment videoId={id} loggedInUser={loggedInUser} />
        </Grid>
        {/* Related Videos */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" color="textSecondary">
            RELATED VIDEOS
          </Typography>
          {videos.map((vid) => (
            <RelatedVideos vid={vid} key={vid._id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Video;
