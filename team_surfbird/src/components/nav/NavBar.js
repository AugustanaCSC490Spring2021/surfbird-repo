import React from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { logOut } from "./../../firebase";

import Profile from "../profile/profile";
import Home from "../../../src/components/feed/Home";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "./home-entertainment-system.png"

export default function NavBar() {
  const routes = ["/Home", "/Profile"];

  return (
    <div className="NavBar">
      <BrowserRouter>
        <Route path="/">
          <AppBar>
           
            
            <Tabs>
            <img margin="5" width="100" src={logo} alt="BigCo Inc. logo"/>
              <Tab
                label="Home"
                value={routes[0]}
                component={Link}
                to={routes[0]}
              />
              <Tab
                label="Profile"
                value={routes[1]}
                component={Link}
                to={routes[1]}
              />
              <Tab label="Log Out" onClick={logOut} />
            </Tabs>
          </AppBar>
        </Route>

        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/Profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
