import React from "react";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h1>TIME TO PLAY THE GAME!</h1>
        <Link to="/lobby">Click to play!</Link>
      </div>
    );
  }
}
