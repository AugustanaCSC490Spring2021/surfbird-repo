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

function Home(props) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

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
            timestamp: "doc.data().timestamp.toDate().toString()",
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      text: input,
      deadline: time,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: localStorage.getItem("user"),
    });

    console.log(localStorage.getItem("user"));
    console.log(
      db
        .collection("todos")
        .where("userId", "==", localStorage.getItem("user"))
        .get()
    );

    setTodos([...todos, input]);
    setInput("");
  };

  const addPost = (event) => {
    event.preventDefault();

    db.collection("posts").add({
      post_title: title,
      text: description,
      read_time: duration,
      userId: localStorage.getItem("user"),
      timestamp: "firebase.firestore.FieldValue.serverTimestamp()",
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
  };

  return (
    <div className="Home">
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <h1 style = {{marginTop: "15vh"}}>*App Name Here*</h1>
        </Grid>
      </Grid>

      <FormControl>
        <InputLabel>Post Title</InputLabel>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Duration</InputLabel>
        <Input
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
      </FormControl>

      <Button color="primary" disabled={!title} type="submit" onClick={addPost}>
        Add Post
      </Button>

      <ul>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </div>
  );
}
export default Home;
