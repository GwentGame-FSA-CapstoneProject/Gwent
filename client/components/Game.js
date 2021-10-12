import React from "react";
import playGame from "../src/scenes/game";

export const config = {
        type: Phaser.AUTO,
        parent: "phaser-example",
        width: 1280,
        height: 1200,
        scene: [
            playGame
        ]
      };

const game = new Phaser.Game(config);
export default class App extends React.Component {
  render() {
   return (
    <div style={{ textAlign: "center" }}>
     <h1>Game view</h1>
    </div>
   );
  }
}
