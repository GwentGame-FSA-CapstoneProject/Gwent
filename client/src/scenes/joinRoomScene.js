import Phaser from "phaser";
import io from "socket.io-client";

export default class joinRoomScene extends Phaser.Scene {
  constructor() {
    super("joinRoomScene");
  }

  create() {
    const width = this.scale.width;
    this.socket = io();

    // send message to start room status communication chain
    this.socket.emit("checkStaticRooms");

    // render buttons for rooms in the open lobby
    const rooms = [];
    this.socket.on("staticRoomStatus", (staticRooms) => {
      console.log("socket in jrs", this.socket.id);
      for (let i = 0; i < staticRooms.length; ++i) {
        // render open lobbies with green font, and red if closed
        if (staticRooms[i].isOpen) {
          rooms[i] = this.add
            .text(width * 0.6, 100 * (i + 1), `Room ${i + 1}`, {
              fontFamily: "serif",
              fontSize: "30px",
              fill: "#7CFC00",
              align: "center",
            })
            .setStroke("#000", 2);
        } else {
          rooms[i] = this.add.text(
            width * 0.6,
            100 * (i + 1),
            `Room ${i + 1}`,
            {
              fontFamily: "serif",
              fontSize: "30px",
              fill: "#FF0000",
              align: "center",
            }
          );
        }
        rooms[i].setInteractive();
        rooms[i].on("pointerover", () => {
          rooms[i].setStroke("#fff", 2);
        });
        rooms[i].on("pointerout", () => {
          rooms[i].setStroke("#000", 2);
          if (staticRooms[i].isOpen) {
            rooms[i].setFill("#7CFC00");
          }
        });
        rooms[i].on("pointerdown", () => {
          rooms[i].setTint("0xc2c2c2");
        });
        rooms[i].on("pointerup", () => {
          this.input.enabled = false;
          rooms[i].clearTint();
          if (staticRooms[i].isOpen) {
            rooms[i].setFill("#7CFC00");
          }
          this.socket.emit("joinRoom", {
            roomKey: `room${i + 1}`,
          });
        });
      }

      // whenever a room closes/opens, the color of the button will update
      this.socket.on("updatedRooms", (staticRooms) => {
        for (let i = 0; i < staticRooms.length; ++i) {
          // render open lobbies with green font, and red if closed
          if (rooms[i]) {
            if (staticRooms[i].isOpen) {
              rooms[i].setFill("#7CFC00");
            } else {
              rooms[i].setFill("#FF0000");
            }
          }
        }
      });
    });

    // feedback if clicked on closed room
    this.socket.on("roomClosed", () => {
      this.input.enabled = true;
      const roomClosedText = this.add.text(350, 40, "This room is closed", {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      });
      const roomClosedInterval = setInterval(() => {
        roomClosedText.destroy();
        clearInterval(roomClosedInterval);
      }, 3000);
    });

    this.socket.on("roomFull", () => {
      this.input.enabled = true;
      const roomFullText = this.add.text(350, 40, "This room is full", {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      });
      const roomFullInterval = setInterval(() => {
        roomFullText.destroy();
        clearInterval(roomFullInterval);
      }, 3000);
    });

    // player will go to stage scene afer receiving room info from server
    this.socket.on("roomInfo", ({ roomInfo, roomKey }) => {
      this.socket.removeAllListeners();
      this.scene.stop("joinRoomScene");
      this.scene.start("Game", {
        socket: this.socket,
        roomInfo,
        roomKey,
      });
    });
    // this.createUI();
  }

  // createUI() {
  //   const backButton = this.add
  //     .image(this.scale.width - 20, 20, "backButton")
  //     .setScrollFactor(0)
  //     .setOrigin(1, 0)
  //     .setScale(4);
  //   backButton.setInteractive();
  //   backButton.on("pointerover", () => {
  //     backButton.setTint(0xc2c2c2);
  //     this.cursorOver.play();
  //   });
  //   backButton.on("pointerout", () => {
  //     backButton.clearTint();
  //     this.cursorOver.stop();
  //   });
  //   backButton.on("pointerdown", () => {
  //     this.clickSound.play();
  //     backButton.setTint(0x3f3f3f);
  //   });
  //   backButton.on("pointerup", () => {
  //     this.input.enabled = false;
  //     this.socket.removeAllListeners();
  //     this.scene.stop("LobbyScene");
  //     this.scene.start("CharSelection");
  //   });
  // }
}
