import React from "react";
import {Tab, Tabs, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { logOut } from './../../firebase';
 
import OtherPage from './../../OtherPage';
import Profile from './../../Profile';
 
 
 
export default function NavBar() {
 
  const routes = ["/Profile", "/OtherPage"];
 
  return (
    <div className="NavBar">
      <BrowserRouter>
        <Route path="/">
        
          <AppBar>
            <Tabs>
              <Tab label="Profile" value = {routes[0]} component={ Link } to={routes[0]} />
              <Tab label="Other Page" value = {routes[1]} component={ Link } to={routes[1]} />
              <Tab label="Log Out" onClick={logOut} />
 
              
            </Tabs>
          </AppBar>
          
          </Route> 
 
         
 
          <Switch>
            <Route path="/Profile" component={Profile} />
            <Route path="/OtherPage" component={OtherPage} />
 
          </Switch>
      </BrowserRouter>
    </div>
 
    
  );
}
