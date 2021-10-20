var uuid = require("uuid-random");
const shuffle = require("shuffle-array");

const {
  uniqueNamesGenerator,
  adjectives,
  names,
} = require("unique-names-generator");

let gameState = "Initializing";
let players = {};
let readyCheck = 0;
let passed = 0;
let chatRoomData = [];
let connectedClients = {};

module.exports = io => {
  io.on("connection", function (socket) {
    console.log("A user connected: " + socket.id);

    players[socket.id] = {
      inDeck: [],
      inHand: [],
      isPlayerA: false,
      isPlayerB: false, //not being used currently
      roundsWon: 0,
      roundsLost: 0,
    };

    if (Object.keys(players).length < 2) {
      players[socket.id].isPlayerA = true;
      io.emit("firstTurn");
    }

    socket.on("sendDeck", function (socketId) {
      players[socketId].inDeck = shuffle([
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
      //console.log(players);
      if (Object.keys(players).length < 2) return;
      io.emit("changeGameState", "Initializing"); //might need extra check to stop spectators restarting game
    });

    socket.on("drawCard", function (socketId) {
      for (let i = 0; i < 10; i++) {
        if (players[socketId].inDeck.length === 0) {
          players[socketId].inDeck = shuffle([
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
          ]);
        }
        players[socketId].inHand.push(players[socketId].inDeck.shift());
      }
      io.emit("drawCard", socketId, players[socketId].inHand);
      readyCheck++;
      if (readyCheck >= 2) {
        gameState = "Ready";
        io.emit("changeGameState", "Ready");
      }
    });

    socket.on("cardPlayed", function (cardName, socketId) {
      io.emit("cardPlayed", cardName, socketId);

      if (passed < 1) io.emit("changeTurn");
    });

    socket.on("disconnect", function () {
      console.log("A user disconnected: " + socket.id);
      delete players[socket.id];
    });

    socket.on("passTurn", function (socketId) {
      passed++;
      if (passed > 1) {
        console.log("End of round");
        io.emit("endRound");
      } else {
        io.emit("changeTurn");
      }
    });

    socket.on("endRound", function () {
      passed = 0;
    });

    socket.on("playerWon", function (socketId) {
      players[socketId].roundsWon++;
      console.log(players[socket.id].roundsWon);
      if (players[socketId].roundsWon === 2) {
        io.emit("endGame", socketId);
      }
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
