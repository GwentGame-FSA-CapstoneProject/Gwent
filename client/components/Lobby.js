import React from "react";
import Game from "./Game";
import PlayerHud from "./PlayerHud";

const Lobby = () => {
  return (
    <div className="container">
      <h3>Welcome to the lobby!</h3>
      <Game />
      <PlayerHud />
    </div>
  );
};

export default Lobby;
