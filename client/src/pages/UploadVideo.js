import React, { useState, useContext } from "react";
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
import { AuthContext } from "../context/auth/authContext";

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
    description: "",
    privacy: "public",
    genre: "it",
    filePath: "",
    loading: false,
  });
  const [percent, setPercent] = useState(0);

  const { title, description, privacy, genre, filePath } = data;

  const { loggedInUser } = useContext(AuthContext);

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleChangeVideo = async (e) => {
    let formData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setPercent(percent);
      },
    };
    formData.append("file", e.target.files[0]);

    try {
      const videoResponse = await axios.post(
        "/api/media/upload",
        formData,
        config
      );
      setData({ ...data, filePath: videoResponse.data.filePath });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !filePath) {
      return alert("All fields are required");
    }
    const formData = {
      title,
      description,
      filePath,
      privacy,
      genre,
      postedBy: loggedInUser,
    };
    setData({ ...data, loading: true });
    await axios.post(`/api/media/new`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData({ ...data, loading: false });
    props.history.push("/");
  };

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
          name="video"
          onChange={handleChangeVideo}
        />
        <label htmlFor="icon-button-file">
          <FileUpload
            style={{ fontSize: "50px", marginBottom: "10px" }}
            color="primary"
          />
        </label>
        {percent > 0 && <LinearProgressWithLabel value={percent} />}
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
        <select className={classes.select} onChange={handleChange("privacy")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select className={classes.select} onChange={handleChange("genre")}>
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
