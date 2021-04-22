import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Profile from "./Profile";
import history from './history';

export default class Pages extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/Profile" component={Profile} />

                </Switch>
            </Router>
        )
    }
}
