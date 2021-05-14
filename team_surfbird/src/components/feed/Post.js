import React, { useState, useEffect } from "react";
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

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';

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
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log("PROPS!!!!");
  console.log(props.post.likes);

  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let button;
  let isLoggedIn;
  isLoggedIn = true;

  if (isLoggedIn) {
    button = (
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
        Like ({props.post.likes.length})
      </Button>
    );
  }

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
          {props.post.title}
        </Typography>
        <br></br>
        <Typography variant="body2" component="p">
          Description: {props.post.description}
        </Typography>
        <br></br>
        <Typography variant="body1" component="p">
          Rating: {props.post.rating}
        </Typography>
      </CardContent>
      <CardActions>
        {button}
        <Button
          onClick={(event) =>
            db
              .collection("posts")
              .doc(props.post.id)
              .update(
                {
                  likes: firebase.firestore.FieldValue.arrayRemove(
                    localStorage.getItem("user")
                  ),
                },
                { merge: true }
              )
          }
        >
          Unlike ({props.post.likes.length})
        </Button>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
          {props.post.comments.length}
        </IconButton>

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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
        Comments: {props.post.comments.length}

        {/* <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" /> */}
        <ul>
          {props.post.comments.map((c) => (
            // <li style={{listSyleType: "none"}}>
            //   <br/>
            //   {c.comment}
            //   <Divider variant="middle" />
            //   {/* <div>
            //     ----------------------------------------------------------------------
            //   </div> */}
            //   <br/>
            // </li>
            <ListItem alignItems="flex-start">
              <ListItemText>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {c.comment}
              </Typography>
                    
              </ListItemText>
              <Divider variant="inset" component="li" />

            </ListItem>
            
          ))}
        </ul>
      </div>

          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Comment
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add a New Comment on this Post
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Comment"
              multiline
              type="email"
              rowsMax={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                db.collection("posts")
                  .doc(props.post.id)
                  .update(
                    {
                      comments: firebase.firestore.FieldValue.arrayUnion({
                        comment,
                      }),
                    },
                    { merge: true }
                  );
                setComment("");
                setOpen(false);
              }}
              color="primary"
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>

        
        </CardContent>
      </Collapse>
    </Card>
  );
}
