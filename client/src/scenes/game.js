import GameHandler from "../helpers/GameHandler"
import SocketHandler from "../helpers/socketHandler";
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.image("albrich", "client/src/assets/albrich.png");
    this.load.image('cow', "client/src/assets/cow.png");
    this.load.image('cardBack', "client/src/assets/cardBack.png");
    this.load.image("board", "client/src/assets/board.jpg");
    //load other cards
  }

  create() {
    this.board = this.add.image(640, 600, "board");


    this.DeckHandler = new DeckHandler(this);
    this.GameHandler = new GameHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();
    this.InteractiveHandler = new InteractiveHandler(this);
  }

  update() {}
}
