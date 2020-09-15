import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const useStyles = makeStyles(() => ({
  sideGrid: {
    display: "flex",
    marginTop: "10px",
    width: "100%",
  },
  sideDiv: {
    marginLeft: "20px",
  },
}));

const RelatedVideos = ({ vid }) => {
  const classes = useStyles();
  return (
    <div className={classes.sideGrid} key={vid._id}>
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
    </div>
  );
};

export default RelatedVideos;
