// var uuid = require("uuid-random");
// const shuffle = require("shuffle-array");
// const { Room, gameRooms, staticRooms } = require("./room");

// //Creates a random roomId
// function codeGenerator() {
//   let code = "";
//   let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
//   for (let i = 0; i < 5; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return code;
// }

// const playerInstance = (socketId) => {
//   return {
//     id: socketId,
//     inDeck: [],
//     inHand: [],
//     isPlayerA: false,
//     isPlayerB: false, //not being used currently
//     roundsWon: 0,
//     roundsLost: 0,
//   };
// };

// const {
//   uniqueNamesGenerator,
//   adjectives,
//   names,
// } = require("unique-names-generator");

// let chatRoomData = [];
// let connectedClients = {};

// module.exports = (io) => {
//   io.on("connection", function (socket) {
//     console.log("A user connected: " + socket.id);
//     console.log("I'm rooms", staticRooms);
//     //create 5 joinable rooms
//     socket.on("checkStaticRooms", () => {
//       socket.emit("staticRoomStatus", staticRooms);
//     });

//     //Creates a new game room with a unique code
//     socket.on("createRoom", () => {
//       let code = codeGenerator();
//       while (Object.keys(gameRooms).includes(code)) {
//         code = codeGenerator();
//       }
//       gameRooms[code] = new Room();
//       socket.emit("roomCreated", code);
//     });

//     //A player is able to join a room with a specific room key
//     socket.on("joinRoom", (roomKey) => {
//       if (Object.keys(gameRooms).includes(roomKey)) {
//         const roomInfo = gameRooms[roomKey];
//         if (roomInfo.playersNum < 2) {
//           socket.join(roomKey);

//           // update players info of the room player joined
//           roomInfo.addNewPlayer(socket.id);

//           // send all info of that room to player
//           socket.emit("roomInfo", { roomInfo, roomKey });

//           // send player info to other players in that room
//           socket.to(roomKey).emit("newPlayerJoined", {
//             playerId: socket.id,
//             playerInfo: roomInfo.players[socket.id],
//           });

//           // remove player from room info when player leaves the room (refresh/close the page)
//           socket.on("disconnecting", () => {
//             roomInfo.removePlayer(socket.id);

//             // reopen room where no players left in room
//             if (roomInfo.playerNum === 0) {
//               if (roomKey.length === 4) {
//                 delete gameRooms[roomKey];
//               }
//               roomInfo.openRoom();
//               io.emit("updatedRooms", staticRooms);
//             } else {
//               // if a player leaves a lobby where players are loaded into a stage, decrease the amount of players loaded
//               if (roomInfo.playersLoaded > 0) {
//                 roomInfo.playersLoaded -= 1;
//               }

//               // update stage limits & winner list for other players in the room
//               roomInfo.countStageLimits();
//               roomInfo.removeWinner(socket.id);

//               // inform other players in that room with updated stage limit
//               socket.to(roomKey).emit("playerLeft", {
//                 playerId: socket.id,
//                 newStageLimits: roomInfo.stageLimits,
//                 winnerNum: roomInfo.winnerNum,
//               });

//               // end the stage if num of winners reach the stage limit
//               if (
//                 roomInfo.reachStageLimit(roomInfo.stages[roomInfo.stageIdx])
//               ) {
//                 roomInfo.resetStageStatus();
//                 roomInfo.updatePlayerList();
//                 io.in(roomKey).emit("stageEnded", roomInfo);
//                 roomInfo.resetWinnerList();
//               }
//             }
//           });
//         } else {
//           socket.emit("roomFull");
//         }
//       } else {
//         socket.emit("roomDoesNotExist");
//       }
//     });
//   });

//   io.of("/chatroom").on("connection", (socket) => {
//     //Client sends a message
//     socket.on("SendMessage", (messageData) => {
//       chatRoomData.push(messageData);
//       sendUpdatedChatRoomData(socket);
//     });

//     //Client entered The chat Room
//     socket.on("UserEnteredRoom", (userData) => {
//       var enteredRoomMessage = {
//         message: `${userData.username} has entered the chat`,
//         username: "",
//         userID: 0,
//         timeStamp: null,
//       };
//       chatRoomData.push(enteredRoomMessage);
//       sendUpdatedChatRoomData(socket);
//       connectedClients[socket.id] = userData;
//     });

//     //Creating identity for new connected user
//     socket.on("CreateUserData", () => {
//       let userID = uuid();
//       let username = uniqueNamesGenerator({
//         dictionaries: [adjectives, names],
//       });
//       var userData = { userID: userID, username: username };
//       socket.emit("SetUserData", userData);
//     });

//     //Player Disconnecting from chat room...
//     socket.on("disconnecting", (data) => {
//       console.log("Client disconnecting...");

//       if (connectedClients[socket.id]) {
//         var leftRoomMessage = {
//           message: `${connectedClients[socket.id].username} has left the chat`,
//           username: "",
//           userID: 0,
//           timeStamp: null,
//         };
//         chatRoomData.push(leftRoomMessage);
//         sendUpdatedChatRoomData(socket);
//         delete connectedClients[socket.id];
//       }
//     });

//     //Clearing Chat room data from server
//     socket.on("ClearChat", () => {
//       chatRoomData = [];
//       console.log(chatRoomData);
//       sendUpdatedChatRoomData(socket);
//     });
//   });
//   //Sending update chat room data to all connected clients
//   function sendUpdatedChatRoomData(client) {
//     client.emit("RetrieveChatRoomData", chatRoomData);
//     client.broadcast.emit("RetrieveChatRoomData", chatRoomData);
//   }
// };
