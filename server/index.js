const server = require('express')();
const http = require('http').createServer(server);
const shuffle = require('shuffle-array');
const cors = require('cors');

let gameState = 'Initializing';
let players = {};
let readyCheck = 0;

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});

server.use(cors());

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false,
        isPlayerB: false
    }

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn'); 
    }

    socket.on('sendDeck', function (socketId) {
        players[socketId].inDeck = shuffle(['albrich', 'cow']); //***need to put whole deck here I think*/
        console.log(players);
        if(Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing"); //might need extra check to stop spectators restarting game
    })

    socket.on('drawCard', function (socketId) {
        if (players[socketId].inDeck.length === 0) {
            players[socketId].inDeck = shuffle(["albrich", "cow"]);
        }
        players[socketId].inHand.push(players[socketId].inDeck.shift());

        console.log(players);
        io.emit('drawCard', socketId, players[socketId].inHand);
        readyCheck++;
        if (readyCheck >= 2) {
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    });

    socket.on('cardPlayed', function (cardName, socketId) {
        io.emit('cardPlayed', cardName, socketId);
        io.emit('changeTurn');
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});