import React, { Component } from 'react';
import './App.css';
import { firebaseApp } from './firebase';

import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Profile from './Profile';



class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null

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

      {/* <Router>
        <Switch>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Profile" component={Profile}/>
        </Switch>
      </Router> */}

      </div>
    )
  }
}

 export default App;