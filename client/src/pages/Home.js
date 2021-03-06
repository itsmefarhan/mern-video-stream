import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Videos from "../components/Videos";

const useStyles = makeStyles(() => ({
  divider: {
    margin: "10px 0px",
  },
  div: {
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/media").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <Typography variant="h5" color="textSecondary">
        Latest
      </Typography>
      <Divider className={classes.divider} />
      <Videos data={data} />
    </div>
  );
};

export default Home;
