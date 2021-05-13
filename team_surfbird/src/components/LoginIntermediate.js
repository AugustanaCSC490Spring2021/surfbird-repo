import React, { Component } from "react";
import LoginNav from "../../../team_surfbird/src/components/nav/LoginNav";

class LoginIntermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "login",
    };
  }
  render() {
    return (
      <div className="intermediate">
        <LoginNav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default LoginIntermediate;
