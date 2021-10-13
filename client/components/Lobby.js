import React from "react";
import Game from "./Game";

const Lobby = () => {
  return (
    <div>
      <h3>Welcome to the lobby!</h3>
      <Game />
      <Chat />
    </div>
  );
};

export default Lobby;
