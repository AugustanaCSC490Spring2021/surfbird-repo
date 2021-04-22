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
import Todo from "./Todo.js";
import Post from "./Post.js";
import db from "./firebase";
import { firebaseApp, logOut } from "./firebase";
import firebase from "firebase";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  //code modeled after https://www.youtube.com/watch?v=VqgTr-nd7Cg&ab_channel=CleverProgrammer
  /*   useEffect(() => {
    console.log(localStorage.getItem("user"));
    db.collection("todos")
      .orderBy("deadline", "asc")
      .onSnapshot((snapshot) => {
        console.log("firebase result");
        console.log(snapshot.docs);
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            deadline: doc.data().deadline,
          }))
        );
      });
  }, []); */

  useEffect(() => {
    console.log(localStorage.getItem("user"));
    db.collection("posts").where("userId", "==", localStorage.getItem("user")).orderBy("timestamp", "asc").onSnapshot((snapshot) => {
        console.log("firebase result");
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().post_title,
            description: doc.data().text,
            duration: doc.data().read_time,
            user: doc.data().userId,
            timestamp: doc.data().timestamp.toDate().toISOString()
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
      db.collection("todos").where("userId", "==", localStorage.getItem("user")).get()
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
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log(localStorage.getItem("user"));
    console.log(
      db.collection("posts").where("user", "==", localStorage.getItem("user")).get()
    );

    setPosts([...posts, title, description]);
    setInput("");
    setTitle("");
    setDescription("");
    setDuration("");
  };

  return (
    <div className="Home">
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <h1>To-Do</h1>
          <Button onClick={logOut} color="primary">
            Log Outie
          </Button>
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