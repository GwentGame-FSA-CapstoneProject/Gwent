import React from "react";
import Game from "./Game";
import Chat from "./Chat";
import PlayerHud from "./PlayerHud";

const Lobby = () => {
  return (
    <div className="container">
      <h3>Welcome to the lobby!</h3>
      <Game />
      <Chat />
      <PlayerHud />
    </div>
  );
};

export default Lobby;
