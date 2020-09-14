import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import axios from "axios";

const Video = ({ match }) => {
  const { id } = match.params;
  const [video, setVideo] = useState({});

  useEffect(() => {
    axios
      .get(`/api/media/${id}`)
      .then((res) => setVideo(res.data))
      .catch((e) => console.log(e));
  }, []);
  
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <ReactPlayer url={`/${video.filePath}`} controls width='100%' height='auto'/>
          <Typography variant="h6">{video.title}</Typography>
          <Typography variant="body1">{video.postedBy && video.postedBy.name}</Typography>
          <Typography variant="caption">
            {video.views} views - {new Date(video.createdAt).toDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          Side Content
        </Grid>
      </Grid>
    </div>
  );
};

export default Video;
