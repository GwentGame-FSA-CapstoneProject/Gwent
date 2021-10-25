import React from "react";
import Game from "./Game";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Lobby = () => {
  return (
    <div className="container">
      <h3>Time to play the game!</h3>
      <Game />
      <Link to="/chatroom">
        <Button>Back to the lobby</Button>
      </Link>
    </div>
  );
};

export default Lobby;
