import GameHandler from "../helpers/GameHandler"
import SocketHandler from "../helpers/socketHandler";
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import Zone1 from "../helpers/dropzone1";
import Zone2 from "../helpers/dropzone2";
import Zone3 from "../helpers/dropzone3";
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
    

    this.zone1 = new Zone1(this);
    this.dropZone1 = this.zone1.renderZone();
    this.outline1 = this.zone1.renderOutline(this.dropZone1);

    this.zone2 = new Zone2(this);
    this.dropZone2 = this.zone2.renderZone();
    this.outline2 = this.zone2.renderOutline(this.dropZone2);

    this.zone3 = new Zone3(this);
    this.dropZone3 = this.zone3.renderZone();
    this.outline3 = this.zone3.renderOutline(this.dropZone3);

  }

  update() {}
}
