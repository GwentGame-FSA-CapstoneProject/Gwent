var uuid = require("uuid-random");
const shuffle = require("shuffle-array");

const {
  uniqueNamesGenerator,
  adjectives,
  names,
} = require("unique-names-generator");

let chatRoomData = [];
let connectedClients = {};

const playerInstance = (socketId) => {
  return {
    id: socketId,
    inDeck: [],
    inHand: [],
    isPlayerA: false,
    isPlayerB: false, //not being used currently
    roundsWon: 0,
    roundsLost: 0,
  };
}

const roomInstance = () => {
    return {
      players: [],
      readyCheck: 0,
      passed: 0,
      gameState: 'not ready'
    }
}

let gameRooms = new Map();

let hashMapSocketIdToRoomIdRelation = new Map()

let roomId = 0;
gameRooms.set(roomId, roomInstance(roomId))

// TODO: Handle player disconnection. We need to remove them from the room and tell the other player

// Helper function to extract players in a room
const getRoomPlayers = (socketId) => {
  const roomId = hashMapSocketIdToRoomIdRelation.get(socketId);
  const room = gameRooms.get(roomId);
  return room.players;
}

module.exports = io => {
  io.on("connection", function (socket) {
    console.log("A user connected: " + socket.id);
    let currentRoom = gameRooms.get(roomId);
    let roomPlayers = currentRoom.players;

    // console.log('currentRoom', currentRoom, currentRoom.players)

    if (roomPlayers.length < 2) {
      socket.join(roomId);
      currentRoom.players.push(playerInstance(socket.id));
      currentRoom.players[0].isPlayerA = true;
      hashMapSocketIdToRoomIdRelation.set(socket.id, roomId);

      if (currentRoom.players.length === 1) {
        io.emit("firstTurn");
      }

    } else {
      roomId++
      gameRooms.set(roomId, roomInstance(roomId))
      console.log('ROOOOOOOMS', gameRooms);
      console.log('creating a new room...', roomId)
      let currentRoom = gameRooms.get(roomId);
      currentRoom.players.push(playerInstance(socket.id));
      currentRoom.players[0].isPlayerA = true;
      io.emit("firstTurn");
      socket.join(roomId);
      hashMapSocketIdToRoomIdRelation.set(socket.id, roomId)
    }


    socket.on("sendDeck", function (socketId) {
      let roomId = hashMapSocketIdToRoomIdRelation.get(socketId)
      let players = gameRooms.get(roomId).players;
      let selectedPlayer = players.find(player => player.id === socketId);

      selectedPlayer.inDeck = shuffle([
        "albrich",
        "cow",
        "botchling",
        "gaunt_odimm",
        "bovine_defense_force",
        "dandelion",
        "emiel_regis",
        "gaunter_odimm_darkness",
        "vesemir",
        "zoltan",
      ]); //***need to put whole deck here I think*/

      if (Object.keys(players).length < 2) return;
      io.emit("changeGameState", "Initializing"); //might need extra check to stop spectators restarting game
    });

    socket.on("drawCard", function (socketId) {
      console.log('server drawCard', socketId);
      let roomId = hashMapSocketIdToRoomIdRelation.get(socket.id)
      let selectedRoom = gameRooms.get(roomId);
      let players = selectedRoom.players;
      let selectedPlayer = players.find(player => player.id === socketId);
      console.log('selectedPlayer',selectedPlayer)

      // check that the player has cards in the deck
      if (selectedPlayer.inDeck.length > 0) {
        // room readyCheck and increment 1
        selectedRoom.readyCheck++;
      }

      for (let i = 0; i < 10; i++) {
        if (selectedPlayer.inDeck.length === 0) {
          selectedPlayer.inDeck = shuffle([
            "albrich",
            "cow",
            "botchling",
            "gaunt_odimm",
            "bovine_defense_force",
            "dandelion",
            "emiel_regis",
            "gaunter_odimm_darkness",
            "vesemir",
            "zoltan",
            "clear_weather",
            "torrential_rain",
            "skellige_storm",
            "impenetrable_fog",
            "biting_frost"
          ]);
        }
        selectedPlayer.inHand.push(selectedPlayer.inDeck.shift());
      }

      io.emit("drawCard", socketId, selectedPlayer.inHand);

      let readyCheck = gameRooms.get(roomId).readyCheck;

      if (readyCheck >= 2) {
        selectedRoom.gameState = "Ready";
        io.emit("changeGameState", "Ready");
      }
    });

    socket.on("cardPlayed", function (cardName, socketId) {
      console.log('Server on cardPlayed', cardName, socketId)
      let roomId = hashMapSocketIdToRoomIdRelation.get(socketId)
      io.to(roomId).emit("cardPlayed", cardName, socketId);
      let currentRoom = gameRooms.get(roomId);
      if (currentRoom.passed < 1) io.to(roomId).emit("changeTurn");
    });

    socket.on("disconnect", function () {
      console.log("A user disconnected: " + socket.id);
      delete selectedPlayer;
    });

    socket.on("passTurn", function (socketId) {
      let roomId = hashMapSocketIdToRoomIdRelation.get(socketId)
      let currentRoom = gameRooms.get(roomId);
      currentRoom.passed++;
      if (currentRoom.passed > 1) {
        console.log("End of round");
        io.to(roomId).emit("endRound");
      } else {
        io.to(roomId).emit("changeTurn");
      }
    });

    socket.on("endRound", function () {
      let currentRoom = gameRooms.get(roomId);
      currentRoom.passed = 0;
    });

    socket.on("playerWon", function (socketId) {
      const players = getRoomPlayers(socketId);

      const playerWhoWon = players.find(player => player.id === socketId);
      playerWhoWon.roundsWon++;

      console.log('rounds won', playerWhoWon.roundsWon, 'for player', playerWhoWon.id);

      if (playerWhoWon.roundsWon === 2) {
        io.emit("endGame", socketId);
      }
    });

    socket.on('draw', function (socketId) {
      const players = getRoomPlayers(socketId);
      players[0].roundsWon++;
      players[1].roundsWon++;

      let roomId = hashMapSocketIdToRoomIdRelation.get(socketId)
        io.to(roomId).emit('yourTurn', players[0].id)
    });
  });

  io.of("/chatroom").on("connection", (socket) => {
    //Client sends a message
    socket.on("SendMessage", (messageData) => {
      chatRoomData.push(messageData);
      sendUpdatedChatRoomData(socket);
    });

    //Client entered The chat Room
    socket.on("UserEnteredRoom", (userData) => {
      var enteredRoomMessage = {
        message: `${userData.username} has entered the chat`,
        username: "",
        userID: 0,
        timeStamp: null,
      };
      chatRoomData.push(enteredRoomMessage);
      sendUpdatedChatRoomData(socket);
      connectedClients[socket.id] = userData;
    });

    //Creating identity for new connected user
    socket.on("CreateUserData", () => {
      let userID = uuid();
      let username = uniqueNamesGenerator({ dictionaries: [adjectives, names] });
      var userData = { userID: userID, username: username };
      socket.emit("SetUserData", userData);
    });

    //Player Disconnecting from chat room...
    socket.on("disconnecting", (data) => {
      console.log("Client disconnecting...");

      if (connectedClients[socket.id]) {
        var leftRoomMessage = {
          message: `${connectedClients[socket.id].username} has left the chat`,
          username: "",
          userID: 0,
          timeStamp: null,
        };
        chatRoomData.push(leftRoomMessage);
        sendUpdatedChatRoomData(socket);
        delete connectedClients[socket.id];
      }
    });

    //Clearing Chat room data from server
    socket.on("ClearChat", () => {
      chatRoomData = [];
      console.log(chatRoomData);
      sendUpdatedChatRoomData(socket);
    });
  });
  //Sending update chat room data to all connected clients
  function sendUpdatedChatRoomData(client) {
    client.emit("RetrieveChatRoomData", chatRoomData);
    client.broadcast.emit("RetrieveChatRoomData", chatRoomData);
  }
}
