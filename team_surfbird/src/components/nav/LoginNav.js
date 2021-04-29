import React from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { logOut } from "./../../firebase";

import Login from "./../../../../team_surfbird/src/components/login/Login.js";
import Signup from "../../../src/components/login/Signup.js";

export default function NavBar() {
  const routes = ["/Login", "/Signup"];

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
                label="Signup"
                value={routes[1]}
                component={Link}
                to={routes[1]}
              />
            </Tabs>
          </AppBar>
        </Route>

        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
