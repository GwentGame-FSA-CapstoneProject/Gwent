import React from "react";
import Game from "./Game";
import Chat from "./Chat";

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
