import React from "react";
import playGame from "../src/scenes/game";

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: "66",
      scene: [playGame],
    };
    new Phaser.Game(config);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        <div id="phaser-example" />
      </div>
    );
  }
}
