import React, { useState } from "react";
import FileUpload from "@material-ui/icons/CloudUpload";
import LoopIcon from "@material-ui/icons/Loop";
import {
  Typography,
  Paper,
  Button,
  FormControl,
  TextField,
  LinearProgress,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  heading: {
    marginBottom: "20px",
  },
  paper: {
    width: "70%",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
  },
  input: {
    display: "none",
  },
  form: {
    width: "50%",
  },
  select: {
    margin: "20px 0px",
    padding: "10px",
    fontSize: "17px",
  },
}));

const UploadVideo = (props) => {
  const classes = useStyles();

  const [data, setData] = useState({
    title: "",
    video: "",
    description: "",
    genre: "",
    mediaId: "",
    percent: 0,
    loading: false,
  });

  const handleChange = (name) => (e) => {
    const value = name === "video" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
    console.log(name === "video" && name);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    data.video && formData.append("video", data.video);
    data.title && formData.append("title", data.title);
    data.description && formData.append("description", data.description);
    data.genre && formData.append("genre", data.genre);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          setData({ ...data, percent });
        }
      },
    };

    setData({ ...data, loading: true });
    const res = await axios.post(`/api/media/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      options,
    });
    setData({ ...data, mediaId: res.data._id, percent: 100, loading: false });
    props.history.push("/");
    // uploadVideo(formData).
    // uploadVideo(formData).then((res) => {
    //   if (res.error) {
    //     console.log(res.error);
    //   } else {
    //     // setData({ ...res, mediaId: res._id });
    //     console.log(res)
    //   }
    // });
  };
  console.log(data);
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h5" className={classes.heading}>
        New Video
      </Typography>
      <FormControl fullWidth className={classes.form}>
        <input
          type="file"
          accept="video/*"
          id="icon-button-file"
          className={classes.input}
          onChange={handleChange("video")}
        />
        <label htmlFor="icon-button-file">
          <FileUpload
            style={{ fontSize: "50px", marginBottom: "10px" }}
            color="primary"
          />
        </label>
        {data.percent > 0 && <LinearProgressWithLabel value={data.percent} />}
        <TextField
          label="Title"
          margin="normal"
          name="title"
          value={data.title}
          onChange={handleChange("title")}
        />
        <TextField
          label="Description"
          margin="normal"
          multiline
          rows={3}
          value={data.description}
          onChange={handleChange("description")}
        />
        <select className={classes.select} onChange={handleChange("genre")}>
          <option value="">Genre</option>
          <option value="it">IT</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
        </select>
      </FormControl>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={data.loading}
          startIcon={data.loading && <LoopIcon />}
        >
          {data.loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </Paper>
  );
};

export default UploadVideo;
