import io from "socket.io-client";
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
    this.load.image("board", "client/src/assets/board.jpg");
  }

  create() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", function () {
      console.log("Connected!");
    });

    this.board = this.add.image(640, 390, "board");
    this.card = this.add
      .image(300, 300, "albrich")
      .setScale(0.3, 0.3)
      .setInteractive();
    this.input.setDraggable(this.card);

    this.zone1 = new Zone1(this);
    this.dropZone1 = this.zone1.renderZone();
    this.outline1 = this.zone1.renderOutline(this.dropZone1);

    this.zone2 = new Zone2(this);
    this.dropZone2 = this.zone2.renderZone();
    this.outline2 = this.zone2.renderOutline(this.dropZone2);

    this.zone3 = new Zone3(this);
    this.dropZone3 = this.zone3.renderZone();
    this.outline3 = this.zone3.renderOutline(this.dropZone3);

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on("dragend", (pointer, gameObject, dropped) => {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    this.input.on("drop", function (pointer, gameObject, dropZone) {
      dropZone.data.values.cards++;
      gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 100;
      gameObject.y = dropZone.y;
    });
  }

  update() {}
}
