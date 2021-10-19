import { io } from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("I am now connected to the server!");
});

export default socket;
