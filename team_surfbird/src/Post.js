import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  GridList,
  Grid
} from "@material-ui/core";
import db from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";

function Post(props) {
  return (
    <List className="post_list">
      <Grid container spacing={24} justify="center">
        <Grid item>
          <ListItem>
            <ListItemText
              disableTypography
              primary={props.post.title}
              style={{ marginRight: "1em", fontSize: "large", font: "sans-serif"}}
            />
            
          </ListItem>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <DeleteIcon
                fontSize="small"
                onClick={(event) =>
                  db.collection("posts").doc(props.post.id).delete()
                }
              />
      </Grid>
      <Grid container spacing={24} justify="center" alignContent="center">
        <Grid>
          <ListItem>
            <ListItemText
                primary={props.post.description}
                style={{ marginLeft: "1em" }}
              />
          </ListItem>
          
        </Grid>
      </Grid>
      <Grid container spacing={24} justify="center" alignContent="center">
        <Grid>
          <ListItem>
            <ListItemText
                primary={props.post.duration}
                style={{ marginLeft: "1em" }}
              />
          </ListItem>
          
        </Grid>
        
      </Grid>
      <Grid container justify="flex-end">
        <Grid item>
          <ListItemText
                  primary=""
                  secondary={props.post.timestamp}
                  style={{ marginLeft: "1em" }}
                />
          </Grid>
      </Grid>
    </List>
  );
}

export default Post;