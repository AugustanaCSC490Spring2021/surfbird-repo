import React from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { logOut } from "./../../firebase";

import Login from "./../../../../team_surfbird/src/components/login/Login.js";
import SignUp from "../../../src/components/login/Signup.js";

export default function NavBar() {
  const routes = ["/Login", "/SignUp"];

  return (
    <div className="NavBar">
      <BrowserRouter>
        <Route path="/">
          <AppBar>
            <Tabs>
              <Tab
                label="Login"
                value={routes[0]}
                component={Link}
                to={routes[0]}
              />
              <Tab
                label="SignUp"
                value={routes[1]}
                component={Link}
                to={routes[1]}
              />
            </Tabs>
          </AppBar>
        </Route>

        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
