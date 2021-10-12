import GameHandler from "../helpers/GameHandler"
import SocketHandler from "../helpers/socketHandler";
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import cardsArray from "../cards/cardClass"

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.image("albrich", "/assets/albrich.png");
    this.load.image('cow', "/assets/cow.png");
    this.load.image('cardBack', "/assets/cardBack.png");
    this.load.image("board", "/assets/board.jpg");
    this.load.image('botchling', "assets/botchling.png");
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
