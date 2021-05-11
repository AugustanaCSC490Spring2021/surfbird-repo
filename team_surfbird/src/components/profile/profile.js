import React, { useState, useEffect } from "react";
import "../feed/Home.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  GridList,
  Grid,
} from "@material-ui/core";
import Todo from "../../Todo.js";
import Post from "../feed/Post";
import db from "../../firebase";
import { firebaseApp, logOut } from "../../firebase";
import firebase from "firebase";
import NavBar from "../nav/NavBar";

function Home(props) {
  const [likes, setLikes] = useState([]);
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
      .where("userId", "==", localStorage.getItem("user"))
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
            likes: doc.data().likes,
          }))
        );
      });
  }, []);

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

    setPosts([...posts, title, description, duration, likes]);
    setInput("");
    setTitle("");
    setDescription("");
    setDuration("");
    setLikes([]);
  };

  return (
    <div className="Home">
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <h1 style={{ marginTop: "15vh" }}>*App Name Here*</h1>
        </Grid>
      </Grid>

      <ul>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </div>
  );
}
export default Home;
