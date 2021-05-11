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
import Todo from "../../Todo.js";
import Post from "./Post";
import db from "../../firebase";
import { firebaseApp, logOut } from "../../firebase";
import firebase from "firebase";
import NavBar from "../nav/NavBar";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';


function Home(props) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [uname, setUname] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    console.log(localStorage.getItem("user"));
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        console.log("firebase result");
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().post_title,
            description: doc.data().text,
            duration: doc.data().read_time,
            user: doc.data().userId,
<<<<<<< HEAD
            uname: doc.data().username
=======
            likes: doc.data().likes,
>>>>>>> d7a76f0b2bb14d0168ffbdf01aca7d56d9720e81
          }))
        );
      });
  }, []);


  const section = {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "#fff"
  };

  const addPost = (event) => {
    event.preventDefault();

    db.collection("posts").add({
      post_title: title,
      text: description,
      read_time: duration,
      userId: localStorage.getItem("user"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: [],
      comments: [],
    });

    console.log(localStorage.getItem("user"));
    console.log(
      db
        .collection("posts")
        .where("user", "==", localStorage.getItem("user"))
        .get()
    );

    setPosts([...posts, title, description, duration]);
    setInput("");
    setTitle("");
    setDescription("");
    setDuration("");
    setOpen(false);
  };

  return (
    <div className="Home">
      <Grid container justify="center" alignItems="center">
        <Grid item xs>
          <h1 style={{ marginTop: "15vh" }}>*App Name Here*</h1>
        </Grid>
        <Grid item xs>
          <div style={section}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Post
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            label="Duration"
            type="number"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
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
        <Grid item xs><h1>Test</h1></Grid>
      </Grid>

     
      
    </div>
  );
}
export default Home;
