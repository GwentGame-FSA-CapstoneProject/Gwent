import { io } from "socket.io-client";

const chatsocket = io("/chatroom");

chatsocket.on("connect", () => {
  console.log("Chat activated!");
});

export default chatsocket;
