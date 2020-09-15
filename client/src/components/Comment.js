import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";

const Comment = ({ videoId, loggedInUser }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  // to refetch comments
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/media/comment/${videoId}`)
      .then((res) => setComments(res.data.result))
      .catch((e) => console.log(e));
  }, [success]);

  const addComment = async (e) => {
    setSuccess(false);
    if (e.keyCode == 13) {
      const data = {
        content: text,
        postedBy: loggedInUser,
        mediaId: videoId,
      };
      await axios.put(`/api/media/comment/${videoId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setText("");
      setSuccess(true);
    }
  };

  const handleDelete = async (commentId) => {
    let permission = window.confirm("Delete Comment?");
    if (permission) {
      setSuccess(false);
      await axios.delete(`/api/media/comment/${videoId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
    }
  };
  return (
    <div>
      {/* Comment Field */}
      {loggedInUser && (
        <TextField
          fullWidth
          placeholder="Write something"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={addComment}
        />
      )}

      {/* Comments */}

      {comments.map((com) => (
        <List key={com._id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={`${com.postedBy.name}`} />
            <ListItemText
              secondary={`${new Date(com.createdAt).toDateString()}`}
            />
            {com.postedBy && loggedInUser && com.postedBy._id === loggedInUser._id && (
              <ListItemSecondaryAction
                onClick={() => handleDelete(com._id)}
                style={{ cursor: "pointer" }}
              >
                <Delete color="error" />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <ListItem>
            <ListItemText primary={com.content} />
          </ListItem>
          <Divider />
        </List>
      ))}
    </div>
  );
};

export default Comment;
