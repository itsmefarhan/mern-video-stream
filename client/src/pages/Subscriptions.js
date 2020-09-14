import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Videos from "../components/Videos";

const useStyles = makeStyles(() => ({
  divider: {
    margin: "10px 0px",
  },
}));

const Subscriptions = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/media/subscriptions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <Typography variant="h5" color="textSecondary">
        Subscriptions
      </Typography>
      <Divider className={classes.divider} />
      <Videos data={data} />
    </div>
  );
};

export default Subscriptions;
