import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  div: {
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const Videos = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {data.map((vid) => (
        <Grid item xs={12} sm={4} md={3} key={vid._id}>
          <Paper elevation={3}>
            <Link className={classes.link} to={`/video/${vid._id}`}>
              <ReactPlayer
                url={`/${vid.filePath}`}
                width={"100%"}
                height="auto"
              />
              <div className={classes.div}>
                <Typography variant="h6">{vid.title}</Typography>
                <Typography variant="body1">{vid.postedBy.name}</Typography>
                <Typography variant="caption">
                  {vid.views} views - {new Date(vid.createdAt).toDateString()}
                </Typography>
              </div>
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Videos;
