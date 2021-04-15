import React from 'react'
import { List, ListItem, ListItemText, Button, GridList } from '@material-ui/core'
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete'

function Posts(props) {
    return (
        <List className="post_list" >
            {/* <GridList container cellHeight='100'> */}
                <GridList item xs='12' cellHeight='auto'>
                <ListItem>
                        <DeleteIcon fontSize='small' onClick={event => db.collection('posts').doc(props.todo.id).delete()} />
                {/* </ListItem> */}
                {/* <ListItem> */}
                        <ListItemText primary={props.post.text} secondary={props.post.deadline} style={{marginLeft:'1em'}}/>
                </ListItem>
                    
                </GridList>
            {/* </GridList> */}
        </List>
    )
}

export default Posts
