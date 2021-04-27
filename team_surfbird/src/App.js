import React, { Component } from 'react';
import './App.css';
import { firebaseApp } from './firebase';
import Home from './components/feed/Home';
import Login from './components/login/Login';


class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
     <div>
      {this.state.user ? 
        (
        <Home />
        ) :
        (
        <Login />
        )
      }
      </div>
    )
  }
}

 export default App;