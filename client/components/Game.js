import React from "react";
import playGame from "../src/scenes/game";
import GameLost from "../src/scenes/endscreenlost";
import GameWon from "../src/scenes/endscreenwon";
import OpponentDisconnect from "../src/scenes/opponentDisconnect"

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 1280,
      height: 1200,
      scene: [playGame, GameLost, GameWon, OpponentDisconnect],
    };
    new Phaser.Game(config);
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    window.location.reload();
  }
  render() {
    return (
      <div className="gamewindow">
        <div id="phaser-example" />
      </div>
    );
  }
}
