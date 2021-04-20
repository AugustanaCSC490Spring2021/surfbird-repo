import React, { useState, useEffect} from 'react';
import './Home.css';
import { Button, FormControl, Input, InputLabel, GridList, Grid } from '@material-ui/core';
import Todo from './Todo.js';
import db from './firebase';
import { firebaseApp, logOut } from './firebase';
import firebase from 'firebase';

    function Home() {

        const [todos, setTodos] = useState([]);
        const [input, setInput] = useState('');
        const [time, setTime] = useState('');

        //code modeled after https://www.youtube.com/watch?v=VqgTr-nd7Cg&ab_channel=CleverProgrammer
        useEffect(() => {
            console.log(localStorage.getItem('user'))
            db.collection('todos').where('userId', '==', localStorage.getItem('user')).orderBy('deadline', 'asc').onSnapshot(snapshot => {
                console.log('firebase result')
                console.log(snapshot.docs)
                setTodos(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text, deadline: doc.data().deadline})))
            })
        }, []);

        const addTodo = (event) => {
            event.preventDefault();

            db.collection('todos').add({
                text: input,
                deadline: time,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userId: localStorage.getItem('user')
            });

            console.log(localStorage.getItem('user'));
            console.log(db.collection('todos').where('userId', '==', localStorage.getItem('user')).get());

            setTodos([...todos, input]);
            setInput('');
        }

        return (
            <div className="Home">
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <h1>To-Do</h1>
                        <Button onClick={ logOut } color='primary'>
                            Log Outie
                        </Button>
                    </Grid>
                </Grid>
                
                <FormControl>
                    <InputLabel>Write a To-Do</InputLabel>
                    <Input value={input} onChange={event => setInput(event.target.value)}/>
                </FormControl>

                <FormControl>
                    <InputLabel></InputLabel>
                    <Input type='date' onChange={event => setTime(event.target.value)} />
                </FormControl>

                <Button color='primary' disabled={!input} type='submit' onClick={addTodo}>
                    Add Todo
                </Button>

                <ul>
                    {todos.map(todo => (
                        <Todo todo={todo} />
                    ))}
                </ul>
            </div>
        );
    }

export default Home;