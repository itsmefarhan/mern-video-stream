import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(`/api/media/${id}`)
      .then((res) => setVideo(res.data))
      .catch((e) => console.log(e));

    axios
      .get(`/api/media/related/${id}`)
      .then((res) => setVideos(res.data))
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <ReactPlayer
            url={`/${video.filePath}`}
            controls
            width="100%"
            height="auto"
          />
          <Typography variant="h6">{video.title}</Typography>
          <Typography variant="body1">
            {video.postedBy && video.postedBy.name}
          </Typography>
          <Typography variant="caption">
            {video.views} views - {new Date(video.createdAt).toDateString()}
          </Typography>
        </Grid>
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
