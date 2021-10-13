const express = require('express')
const app = require('express')();
const shuffle = require('shuffle-array');
const path = require('path');


// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '..', 'dist/index.html')));

const server = app.listen(5000, function () {
    console.log('Server started at port 5000!');
});

let gameState = 'Initializing';
let players = {};
let readyCheck = 0;
let passed = 0;

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false,
        isPlayerB: false,
    }

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    socket.on('sendDeck', function (socketId) {
        players[socketId].inDeck = shuffle(['albrich', 'cow','botchling','gaunt_odimm','bovine_defense_force','dandelion','emiel_regis','gaunter_odimm_darkness','vesemir','zoltan']); //***need to put whole deck here I think*/
        console.log(players);
        if(Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing"); //might need extra check to stop spectators restarting game
    })

    socket.on('drawCard', function (socketId) {
        for(let i = 0; i < 10; i++){
        if (players[socketId].inDeck.length === 0) {
            players[socketId].inDeck = shuffle(["albrich", "cow",'botchling','gaunt_odimm','bovine_defense_force','dandelion','emiel_regis','gaunter_odimm_darkness','vesemir','zoltan']);
        }
        players[socketId].inHand.push(players[socketId].inDeck.shift());
    }
        io.emit('drawCard', socketId, players[socketId].inHand);
        readyCheck++;
        if (readyCheck >= 2) {
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    });

    socket.on('cardPlayed', function (cardName, socketId) {
        io.emit('cardPlayed', cardName, socketId);

        if(passed < 1)
            io.emit('changeTurn');
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });

    socket.on('passTurn', function (socketId) {
        passed++;
        if(passed > 1){
            console.log("End of round")
            io.emit('endRound');
        }else{
        io.emit('passTurn', socketId);
        io.emit('changeTurn');
        }
    });
});
