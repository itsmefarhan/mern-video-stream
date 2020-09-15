import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const useStyles = makeStyles(() => ({
  sideGrid: {
    display: "flex",
    marginTop: "10px",
  },
  sideDiv: {
    marginLeft: "20px",
  },
}));

const RelatedVideos = ({ vid }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.sideGrid} elevation={3} key={vid._id}>
      <Link to={`/video/${vid._id}`}>
        <ReactPlayer url={`/${vid.filePath}`} width={200} height="auto" />
      </Link>
      <div className={classes.sideDiv}>
        <Typography variant="h6">{vid.title}</Typography>
        <Typography variant="body1">
          {vid.postedBy && vid.postedBy.name}
        </Typography>
        <Typography variant="caption">{vid.views} views</Typography>
      </div>
    </Paper>
  );
};

export default RelatedVideos;
