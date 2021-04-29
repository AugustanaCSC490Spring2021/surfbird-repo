import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../team_surfbird/src/components/nav/NavBar";

class Intermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
    };
  }
  render() {
    return (
      <div className="intermediate">
        <NavBar />
      </div>
    );
  }
}

export default Intermediate;
