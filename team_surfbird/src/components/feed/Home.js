import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  GridList,
  Grid,
} from "@material-ui/core";
import Post from "./Post";
import db from "../../firebase";
import { firebaseApp, logOut } from "../../firebase";
import firebase from "firebase";
import NavBar from "../nav/NavBar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

function Home(props) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [uname, setUname] = useState("");
  const[timestamp, setTimeStamp] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    db.collection("posts")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        console.log("firebase result");
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().post_title,
            description: doc.data().text,
            rating: doc.data().read_time,
            user: doc.data().userId,
            likes: doc.data().likes,
            comments: doc.data().comments,
            timestamp: new Date(doc.data().timestamp.toDate()).toLocaleDateString() + " " + new Date(doc.data().timestamp.toDate()).toLocaleTimeString()
          }))
        );
      });
  }, []);

  const section = {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "#fff",
  };

  const addPost = (event) => {
    event.preventDefault();

    db.collection("posts").add({
      post_title: title,
      text: description,
      read_time: rating,
      userId: localStorage.getItem("user"),
      timestamp: timestamp,
      likes: likes,
      comments: comments,
    });

    console.log(localStorage.getItem("user"));
    console.log(
      db
        .collection("posts")
        .where("user", "==", localStorage.getItem("user"))
        .get()
    );

    setPosts([...posts, title, description, rating, likes, timestamp]);
    setInput("");
    setTitle("");
    setLikes([]);
    setComments([]);
    setDescription("");
    setRating("");
    setOpen(false);
    setTimeStamp("");
    //Refresh page
    window.location.reload(false);
  };

  return (
    <div className="Home">
      <Fab
        onClick={handleClickOpen}
        style={style}
        color="secondary"
        aria-label="edit"
      >
        <EditIcon />
      </Fab>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <div style={section}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Post
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add a New Post</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Post Your Current Activity
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Post Title"
                  type="email"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  multiline
                  rowsMax={4}
                  label="Description"
                  type="email"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="standard-number"
                  label="Rating (out of 10)"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  type="number"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">minutes</InputAdornment>
                  }
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={addPost} color="primary">
                  Post
                </Button>
              </DialogActions>
            </Dialog>

            <ul>
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </ul>
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
}
export default Home;
