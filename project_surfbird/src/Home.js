import React, { useState, useEffect} from 'react';
import './Home.css';
import { Button, FormControl, Input, InputLabel, GridList, Grid } from '@material-ui/core';
import Posts from './Posts';
import db from './firebase';
import { firebaseApp, logOut } from './firebase';
import firebase from 'firebase';

    function Home() {

        const [todos, setPosts] = useState([]);
        const [input, setInput] = useState('');
        const [time, setTime] = useState('');

        //code modeled after https://www.youtube.com/watch?v=VqgTr-nd7Cg&ab_channel=CleverProgrammer
        useEffect(() => {
            console.log(localStorage.getItem('user'))
            db.collection('posts').where('userId', '==', localStorage.getItem('user')).orderBy('deadline', 'asc').onSnapshot(snapshot => {
                console.log('firebase result')
                console.log(snapshot.docs)
                setPosts(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text, deadline: doc.data().deadline})))
            })
        }, []);

        const addPost = (event) => {
            event.preventDefault();

            db.collection('posts').add({
                text: input,
                deadline: time,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userId: localStorage.getItem('user')
            });

            console.log(localStorage.getItem('user'));
            console.log(db.collection('posts').where('userId', '==', localStorage.getItem('user')).get());

            setTodos([...posts, input]);
            setInput('');
        }

        return (
            <div className="Home">
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <h1>Title TBD</h1>
                        <Button onClick={ logOut } color='primary'>
                            Log Out
                        </Button>
                    </Grid>
                </Grid>
                
                <FormControl>
                    <InputLabel>Write a Post</InputLabel>
                    <Input value={input} onChange={event => setInput(event.target.value)}/>
                </FormControl>

                <FormControl>
                    <InputLabel></InputLabel>
                    <Input type='date' onChange={event => setTime(event.target.value)} />
                </FormControl>

                <Button color='primary' disabled={!input} type='submit' onClick={addTodo}>
                    Add Post
                </Button>

                <ul>
                    {posts.map(post => (
                        <Posts post={post} />
                    ))}
                </ul>
            </div>
        );
    }

export default Home;