const express = require("express");
const app = require("express")();
const path = require("path");

socketio = require("socket.io")

let PORT = process.env.PORT || 5000;

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "dist/index.html"))
);

const server = app.listen(PORT, function () {
  console.log(`Server started at port ${PORT}!`);
});

const io = socketio(server);
require("./socket")(io)

/*socket.on('draw', function (socketId) {
  players[socketId].roundsWon++;

  if(players[socketId].isPlayerA)
      io.emit('yourTurn', socketId)
});*/
