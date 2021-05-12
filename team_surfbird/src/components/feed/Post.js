import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  GridList,
  Grid,
} from "@material-ui/core";
import db from "./../../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const data = "";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log("PROPS!!!!");
  console.log(props.post.likes);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          username
        </Typography>

        <Typography variant="h5" component="h2">
          Media: {props.post.title}
        </Typography>

        <Typography variant="body2" component="p">
          {props.post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={(event) =>
            db
              .collection("posts")
              .doc(props.post.id)
              .update(
                {
                  likes: firebase.firestore.FieldValue.arrayUnion(
                    localStorage.getItem("user")
                  ),
                },
                { merge: true }
              )
          }
        >
          Like
        </Button>
        <Button>Comment</Button>
        <Button
          color="secondary"
          disabled={
            localStorage.getItem("user") === props.post.user ? false : true
          }
          visibility={
            localStorage.getItem("user") === props.post.user
              ? "hidden"
              : "hidden"
          }
          fontSize="small"
          onClick={(event) =>
            db.collection("posts").doc(props.post.id).delete()
          }
        >
          Delete
        </Button>
      </CardActions>
      <div>Likes: {props.post.likes.length}</div>
    </Card>
  );
}
