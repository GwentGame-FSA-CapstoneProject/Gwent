class Room {
  constructor() {
    this.players = {};
    this.playersNum = 0;
    this.isOpen = true;
    this.gameState = "not ready";
  }
  addNewPlayer(socketId) {
    this.players[socketId] = {
      inDeck: [],
      inHand: [],
      isPlayerA: false,
      isPlayerB: false,
      roundsWon: 0,
      roundsLost: 0,
    };
    this.playersNum += 1;
  }
  removePlayer(socketId) {
    if (this.players[socketId]) {
      delete this.players[socketId];
      this.playersNum -= 1;
    }
  }
  closeRoom() {
    this.isOpen = false;
  }

  openRoom() {
    this.isOpen = true;
  }
}

const gameRoom = {};
const staticRooms = [];
const totalRoomNum = 5;
for (let i = 1; i <= totalRoomNum; ++i) {
  gameRoom[`room${i}`] = new Room();
  staticRooms.push(gameRoom[`room${i}`]);
}

module.exports = { Room, gameRoom, staticRooms };
